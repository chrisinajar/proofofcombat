import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import {
  useGraalAvailableQuery,
  useGraalLedgerQuery,
  useChallengeGraalMutation,
  useChooseGraalLossBenefitMutation,
  GraalLossBenefit,
} from "src/generated/graphql";

import { useDelay } from "src/hooks/use-delay";

export function DuelingStone(): JSX.Element | null {
  const [currentDelay, setDelay] = useDelay();

  const { data: available, refetch: refetchAvailable } = useGraalAvailableQuery({
    fetchPolicy: "cache-and-network",
  });
  const canChallenge = !!available?.graalAvailable;

  const { data: ledgerData, refetch: refetchLedger } = useGraalLedgerQuery({
    skip: !canChallenge,
    fetchPolicy: "cache-and-network",
  });
  const [challenge, { loading: challenging }] = useChallengeGraalMutation();
  const [chooseBenefit, { loading: choosing }] = useChooseGraalLossBenefitMutation();

  const [lastOutcome, setOutcome] = React.useState<string | null>(null);
  const [lastHint, setHint] = React.useState<string | null>(null);
  const [lastLog, setLog] = React.useState<readonly { time: number; damage: number; attackType: string; isEnchantment: boolean; success: boolean; from: string; to: string; critical: boolean }[] | null>(null);
  const [showLog, setShowLog] = React.useState<boolean>(false);
  const [pendingLoss, setPendingLoss] = React.useState<boolean>(false);

  const shouldDisable = challenging || choosing || currentDelay > 0 || !canChallenge;
  const disableReason = (() => {
    if (!canChallenge) return "You may only challenge once per day.";
    if (currentDelay > 0) return `In delay: available in ${(currentDelay / 1000).toFixed(1)}s`;
    if (challenging) return "Fighting Graal...";
    if (choosing) return "Applying boon...";
    return "";
  })();

  async function handleChallenge() {
    try {
      const res = await challenge();
      const result = res.data?.challengeGraal;
      if (result) {
        setOutcome(result.outcome);
        setHint(result.hint ?? null);
        setLog(result.log ?? null);
        setShowLog(true);
        setPendingLoss(result.outcome === "loss");
      }
      await Promise.all([refetchLedger(), refetchAvailable()]);
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  async function applyBenefit(benefit: GraalLossBenefit) {
    try {
      await chooseBenefit({ variables: { benefit } });
      setPendingLoss(false);
      await refetchLedger();
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  if (!available) return null;

  return (
    <div>
      <Typography variant="h6" component="h3" gutterBottom>
        Dueling Stone
      </Typography>
      <Tooltip title={disableReason} disableHoverListener={!shouldDisable}>
        <span>
          <Button variant="outlined" color="secondary" disabled={shouldDisable} onClick={handleChallenge}>
            Challenge Graal
          </Button>
        </span>
      </Tooltip>

      {lastOutcome && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Outcome: {lastOutcome}
          </Typography>
          {lastHint && (
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {lastHint}
            </Typography>
          )}
          {lastLog && lastLog.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Button size="small" onClick={() => setShowLog((s) => !s)}>
                {showLog ? "Hide duel log" : "Show duel log"}
              </Button>
              {showLog && (
                <Box sx={{ mt: 1, maxHeight: 200, overflowY: "auto", textAlign: "left" }}>
                  {lastLog.slice(0, 100).map((e, idx) => (
                    <Typography key={`gll-${idx}`} variant="caption" display="block">
                      t={e.time} • {e.from} → {e.to}: -{Math.round(e.damage)} {e.isEnchantment ? "[ench]" : ""} {e.critical ? "[crit]" : ""}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

      {pendingLoss && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" gutterBottom>
            Choose your tempering:
          </Typography>
          <Button size="small" sx={{ mr: 1 }} onClick={() => applyBenefit(GraalLossBenefit.ShameForged)}>
            Shame-Forged (+1% boss damage ×10 kills)
          </Button>
          <Button size="small" onClick={() => applyBenefit(GraalLossBenefit.Scabsteel)}>
            Scabsteel (+2% defense, 1h)
          </Button>
        </Box>
      )}

      {ledgerData?.graalLedger && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Duels: {ledgerData.graalLedger.total} — W {ledgerData.graalLedger.wins} / L {ledgerData.graalLedger.losses} — Streak {ledgerData.graalLedger.currentStreak} (Best {ledgerData.graalLedger.bestStreak})
          </Typography>
        </Box>
      )}
    </div>
  );
}
