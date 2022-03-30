import React, { useState } from "react";
import { words } from "capitalize";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import CachedIcon from "@mui/icons-material/Cached";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

import {
  Hero,
  CampResources,
  PlayerLocation,
  useSettleCampMutation,
  PlayerLocationUpgrades,
  useBuyResourceMutation,
  useUpgradeCampMutation,
  useSellResourceMutation,
  useAvailableUpgradesQuery,
  PlayerLocationUpgradeDescription,
} from "src/generated/graphql";

import { useSpecialLocation } from "src/hooks/use-location";

import { CampResourceShop } from "./camp-resource-shop";

export function Camp({
  hero,
  onShowSettlement,
}: {
  hero: Hero;
  onShowSettlement?: () => void;
}): JSX.Element | null {
  const specialLocation = useSpecialLocation();
  let isLocal = false;
  if (
    hero.home &&
    hero.home.location.x === hero.location.x &&
    hero.home.location.y === hero.location.y &&
    hero.home.location.map === hero.location.map
  ) {
    isLocal = true;
  }
  if (specialLocation) {
    return null;
  }
  if (!hero.home && hero.gold < 100000) {
    return null;
  }
  return (
    <Box>
      {!hero.home && <SettleCamp hero={hero} />}
      {hero.home && (
        <ManageCamp
          isLocal={isLocal}
          hero={hero}
          onShowSettlement={onShowSettlement}
        />
      )}
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
  );
}

function SettleCamp({ hero }: { hero: Hero }): JSX.Element {
  const [settleCamp, { loading }] = useSettleCampMutation();

  async function handleSettleCamp() {
    try {
      await settleCamp();
    } catch (e) {}
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Settle Camp
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Settling a camp site allows you to heal faster while standing on that
        square. Additionally, you'll be able to upgrade the camp site to gain
        additional features and upgrades.
      </Typography>
      <LoadingButton
        loading={loading}
        color="success"
        onClick={handleSettleCamp}
        sx={{ p: 2 }}
        startIcon={<FireplaceIcon />}
      >
        Settle Camp for {(100000).toLocaleString()} Gold
      </LoadingButton>
    </Box>
  );
}

function ManageCamp({
  hero,
  isLocal,
  onShowSettlement,
}: {
  hero: Hero;
  isLocal: boolean;
  onShowSettlement?: () => void;
}): JSX.Element | null {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [settleCamp, { loading }] = useSettleCampMutation();

  async function handleSettleCamp() {
    setShowConfirmationModal(false);
    try {
      await settleCamp();
    } catch (e) {}
  }

  if (!hero.home) {
    return null;
  }

  if (!isLocal) {
    return (
      <Box>
        <Dialog
          open={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          aria-labelledby="confirmation-title"
          aria-describedby="confirmation-description"
        >
          <DialogTitle id="confirmation-title">
            Destroy existing campsite?
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="confirmation-description">
              Settling a new camp here will leave your old camp abandoned. You
              will lose any upgrades to the camp or anything stored there.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color="error"
              loading={loading}
              onClick={() => setShowConfirmationModal(false)}
            >
              Nevermind
            </LoadingButton>
            <LoadingButton
              color="success"
              loading={loading}
              onClick={handleSettleCamp}
              autoFocus
            >
              Re-Settle Camp
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Typography sx={{ mb: 2 }}>
          You must be at your campsite to interract with it. Your campsite is at{" "}
          <b>
            {hero.home.location.x}, {hero.home.location.y}
          </b>
        </Typography>

        <LoadingButton
          loading={loading}
          color="error"
          onClick={() => setShowConfirmationModal(true)}
          sx={{ p: 2 }}
          startIcon={<CachedIcon />}
        >
          Rebuild Camp HERE for {(100000).toLocaleString()} Gold
        </LoadingButton>
      </Box>
    );
  }

  const hasTradingPost = !!hero.home.upgrades.find(
    (up) => up === PlayerLocationUpgrades.TradingPost
  );
  const hasSettlement = !!hero.home.upgrades.find(
    (up) => up === PlayerLocationUpgrades.Settlement
  );

  const dialogLabel = hasSettlement ? "Manage Settlement" : "Manage Campsite";

  return (
    <Box>
      <Dialog
        open={showManageModal}
        onClose={() => setShowManageModal(false)}
        aria-labelledby="manage-camp-title"
        aria-describedby="manage-camp-description"
      >
        <DialogTitle id="manage-camp-title">{dialogLabel}</DialogTitle>

        <DialogContent>
          <CampResourceDisplay camp={hero.home} />
          <DialogContentText id="manage-camp-description">
            The fire crackles and pops as you work.
            {!hasSettlement &&
              " Your tools and supplies lie staggered across the campsite."}
            {hasSettlement &&
              " Your tools sit organized in the shed, spare the ones in use"}
          </DialogContentText>
          <CampResourceShop hero={hero} camp={hero.home} />
          {hasTradingPost && <CampTradingPost hero={hero} camp={hero.home} />}
          <CampUpgrades hero={hero} camp={hero.home} />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="success"
            loading={loading}
            onClick={() => setShowManageModal(false)}
          >
            Done
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your {hasSettlement ? "Settlement" : "Campsite"}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        The fire crackles and pops as it burns through the night.
      </Typography>
      <LoadingButton
        color="warning"
        variant="contained"
        loading={loading}
        onClick={() =>
          hasSettlement && onShowSettlement
            ? onShowSettlement()
            : setShowManageModal(true)
        }
        startIcon={<FireplaceIcon />}
      >
        Open {hasSettlement ? "Settlement" : "Camps"} Management
      </LoadingButton>
    </Box>
  );
}

function CampResourceDisplay({ camp }: { camp: PlayerLocation }): JSX.Element {
  console.log(camp.resources);
  return (
    <Grid container columns={8}>
      {camp.resources.map((resource) => (
        <Grid item xs={8} sm={4} md={2} key={resource.name}>
          <b>{words(resource.name)}</b>:{" "}
          {resource.value === 0 ? (
            <Typography sx={{ display: "inline-block" }} color="error">
              {resource.value.toLocaleString()}
            </Typography>
          ) : (
            resource.value.toLocaleString()
          )}{" "}
          / {resource.maximum && resource.maximum.toLocaleString()}
        </Grid>
      ))}
    </Grid>
  );
}

function CampUpgrades({
  hero,
  camp,
}: {
  hero: Hero;
  camp: PlayerLocation;
}): JSX.Element | null {
  const [upgradeCampMutation, { loading }] = useUpgradeCampMutation();
  const { data, refetch } = useAvailableUpgradesQuery();
  const upgradeList: PlayerLocationUpgradeDescription[] =
    data?.availableUpgrades ?? [];

  console.log(upgradeList);

  if (!upgradeList.length) {
    return null;
  }

  function goldCost(cost: CampResources[]): number {
    return cost.find((entry) => entry.name === "gold")?.value ?? 0;
  }

  async function handleUpgradeCamp(upgrade: PlayerLocationUpgrades) {
    try {
      await upgradeCampMutation({
        variables: {
          upgrade,
        },
      });
      await refetch();
    } catch (e) {}
  }

  const hasSettlement = !!camp.upgrades.find(
    (up) => up === PlayerLocationUpgrades.Settlement
  );

  return (
    <Box>
      <Typography variant="h6">
        {hasSettlement ? "Settlement" : "Camp"} Upgrades
      </Typography>
      {upgradeList.map((upgrade) => (
        <Tooltip
          key={upgrade.type}
          title={upgrade.cost
            .map(
              (entry: CampResources) =>
                `${entry.value.toLocaleString()} ${words(entry.name)}`
            )
            .join("\n")}
        >
          <Box sx={{ m: 1 }}>
            <LoadingButton
              loading={loading}
              sx={{ m: 1 }}
              variant="outlined"
              color={goldCost(upgrade.cost) > hero.gold ? "error" : "success"}
              onClick={() => handleUpgradeCamp(upgrade.type)}
            >
              Upgrade
            </LoadingButton>
            {upgrade.name}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

function CampTradingPost({
  hero,
  camp,
}: {
  hero: Hero;
  camp: PlayerLocation;
}): JSX.Element | null {
  return null;
  return (
    <Box>
      <Divider sx={{ m: 1 }} />
      <Typography variant="h6">Trading Post</Typography>
    </Box>
  );
}
