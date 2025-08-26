import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  Hero,
  InventoryItem,
  InventoryItemType,
  ArtifactAttributeType,
} from "src/generated/graphql";
import { itemDisplayName, getEnchantmentDisplay, modifierText, isItemEquipped } from "src/helpers";
import { visuallyHidden } from "@mui/utils";

import type { Slots } from "./types";

function computeBaseWeaponDamage(level: number): number {
  // Mirrors server Unit.getBaseDamage without hero bonuses
  const increasedBaseDamage = 20;
  const base = Math.max(1, Math.pow(1.05, level) * level * 8 + increasedBaseDamage);
  return Math.round(base);
}

const ArmorSlotPenalty: Record<InventoryItemType, number> = {
  [InventoryItemType.BodyArmor]: 1,
  [InventoryItemType.FootArmor]: 3,
  [InventoryItemType.HandArmor]: 3,
  [InventoryItemType.HeadArmor]: 2,
  [InventoryItemType.LegArmor]: 2,
  [InventoryItemType.Shield]: 1,
  [InventoryItemType.Accessory]: 0,
  [InventoryItemType.MeleeWeapon]: 0,
  [InventoryItemType.Quest]: 0,
  [InventoryItemType.RangedWeapon]: 0,
  [InventoryItemType.SpellFocus]: 0,
};

function armorForTier(level: number, type: InventoryItemType): number {
  if (level < 1) return 0;
  const raw = Math.round((level / 2 + Math.log(level)) * Math.pow(level, 1.3));
  const penalty = ArmorSlotPenalty[type] ?? 1;
  const adjusted = penalty > 0 ? (raw + penalty) / penalty : 0;
  return Math.round(adjusted);
}

function weaponDamageWithBuiltIns(item: InventoryItem): number | undefined {
  if (!isWeapon(item.type)) return undefined;
  const base = computeBaseWeaponDamage(item.level);
  const flat = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemFlatDamage)
    .reduce((m, a) => m + a.magnitude, 0);
  const bonusSum = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemBonusDamage)
    .reduce((m, a) => m + a.magnitude, 0);
  const multiplier = bonusSum ? (bonusSum >= 1 ? bonusSum : 1 + bonusSum) : 1;
  return Math.round(base * multiplier + flat);
}

function armorWithBuiltIns(item: InventoryItem): number | undefined {
  if (!isArmor(item.type)) return undefined;
  const base = armorForTier(item.level, item.type);
  const flat = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemFlatArmor)
    .reduce((m, a) => m + a.magnitude, 0);
  const bonusSum = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemBonusArmor)
    .reduce((m, a) => m + a.magnitude, 0);
  const multiplier = bonusSum ? (bonusSum >= 1 ? bonusSum : 1 + bonusSum) : 1;
  return Math.round(base * multiplier + flat);
}

function isWeapon(type: InventoryItemType): boolean {
  return (
    type === InventoryItemType.MeleeWeapon ||
    type === InventoryItemType.RangedWeapon ||
    type === InventoryItemType.SpellFocus
  );
}

function isArmor(type: InventoryItemType): boolean {
  return (
    type === InventoryItemType.BodyArmor ||
    type === InventoryItemType.HandArmor ||
    type === InventoryItemType.LegArmor ||
    type === InventoryItemType.HeadArmor ||
    type === InventoryItemType.FootArmor ||
    type === InventoryItemType.Shield
  );
}

function allowedSlotsForItem(item: InventoryItem): Slots[] {
  switch (item.type) {
    case InventoryItemType.MeleeWeapon:
    case InventoryItemType.RangedWeapon:
    case InventoryItemType.Shield:
    case InventoryItemType.SpellFocus:
      return ["leftHand", "rightHand"];
    case InventoryItemType.BodyArmor:
      return ["bodyArmor"];
    case InventoryItemType.HandArmor:
      return ["handArmor"];
    case InventoryItemType.LegArmor:
      return ["legArmor"];
    case InventoryItemType.HeadArmor:
      return ["headArmor"];
    case InventoryItemType.FootArmor:
      return ["footArmor"];
    default:
      return [];
  }
}

type SortKey = "name" | "type" | "level" | "baseDmg" | "baseArmor";

function sortValueFor(item: InventoryItem, key: SortKey): string | number {
  switch (key) {
    case "name":
      return itemDisplayName(item).toLowerCase();
    case "type":
      return item.type;
    case "level":
      return item.level;
    case "baseDmg":
      return isWeapon(item.type)
        ? // prefer server-computed when available
          (typeof (item as any).baseDamage === "number"
            ? ((item as any).baseDamage as number)
            : weaponDamageWithBuiltIns(item) ?? 0)
        : 0;
    case "baseArmor":
      return isArmor(item.type)
        ? (typeof (item as any).baseArmor === "number"
            ? ((item as any).baseArmor as number)
            : armorWithBuiltIns(item) ?? 0)
        : 0;
  }
}

export function InventoryBrowser({
  hero,
  onEquip,
  disabled,
}: {
  hero: Hero;
  onEquip: (slot: Slots, id: string) => void;
  disabled: boolean;
}): JSX.Element | null {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | InventoryItemType>("all");
  const [sortKey, setSortKey] = useState<SortKey>("level");
  const [ascending, setAscending] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const pageSize = 200;

  const allItems = hero.inventory;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = allItems;
    if (typeFilter !== "all") {
      items = items.filter((i) => i.type === typeFilter);
    }
    if (q) {
      items = items.filter((i) => {
        const name = itemDisplayName(i).toLowerCase();
        const ench = i.enchantment ? getEnchantmentDisplay(i.enchantment).toLowerCase() : "";
        const builtIns = (i.builtIns || []).map((b) => modifierText(b).toLowerCase()).join(" ");
        return name.includes(q) || ench.includes(q) || builtIns.includes(q);
      });
    }
    return items;
  }, [allItems, query, typeFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = sortValueFor(a, sortKey);
      const vb = sortValueFor(b, sortKey);
      if (va < (vb as any)) return ascending ? -1 : 1;
      if (va > (vb as any)) return ascending ? 1 : -1;
      // tie-breakers
      const la = sortValueFor(a, "level") as number;
      const lb = sortValueFor(b, "level") as number;
      if (la !== lb) return ascending ? la - lb : lb - la;
      return itemDisplayName(a).localeCompare(itemDisplayName(b));
    });
    return arr;
  }, [filtered, sortKey, ascending]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pageItems = sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  function setSort(next: SortKey) {
    if (next === sortKey) {
      setAscending(!ascending);
    } else {
      setSortKey(next);
      setAscending(next === "name" || next === "type");
    }
  }

  if (!hero) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h3" sx={{ fontSize: "1.2rem", mb: 1 }}>
        Inventory Browser
      </Typography>
      <Grid container spacing={1} columns={12} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            fullWidth
            size="small"
            label="Search inventory"
            placeholder="Search by name, enchantment, or modifier"
            inputProps={{ "aria-label": "Search inventory" }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="inventory-type-filter-label">Filter by type</InputLabel>
            <Select
              labelId="inventory-type-filter-label"
              label="Filter by type"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setPage(0);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {Object.values(InventoryItemType).map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper} aria-label="Inventory items table">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortKey === "name" ? (ascending ? "asc" : "desc") : false}>
                <TableSortLabel
                  active={sortKey === "name"}
                  direction={sortKey === "name" && ascending ? "asc" : "desc"}
                  onClick={() => setSort("name")}
                >
                  Name
                  {sortKey === "name" ? (
                    <Box component="span" sx={visuallyHidden as any}>
                      {ascending ? "sorted ascending" : "sorted descending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Enchant</TableCell>
              <TableCell sortDirection={sortKey === "type" ? (ascending ? "asc" : "desc") : false}>
                <TableSortLabel
                  active={sortKey === "type"}
                  direction={sortKey === "type" && ascending ? "asc" : "desc"}
                  onClick={() => setSort("type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={sortKey === "level" ? (ascending ? "asc" : "desc") : false}>
                <TableSortLabel
                  active={sortKey === "level"}
                  direction={sortKey === "level" && ascending ? "asc" : "desc"}
                  onClick={() => setSort("level")}
                >
                  Lvl
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={sortKey === "baseDmg" ? (ascending ? "asc" : "desc") : false}>
                <TableSortLabel
                  active={sortKey === "baseDmg"}
                  direction={sortKey === "baseDmg" && ascending ? "asc" : "desc"}
                  onClick={() => setSort("baseDmg")}
                >
                  Base Dmg
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={sortKey === "baseArmor" ? (ascending ? "asc" : "desc") : false}>
                <TableSortLabel
                  active={sortKey === "baseArmor"}
                  direction={sortKey === "baseArmor" && ascending ? "asc" : "desc"}
                  onClick={() => setSort("baseArmor")}
                >
                  Armor
                </TableSortLabel>
              </TableCell>
              <TableCell>Built-ins</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item) => {
              const name = itemDisplayName(item);
              const baseDmg = (item as any).baseDamage ?? weaponDamageWithBuiltIns(item);
              const baseArmor = (item as any).baseArmor ?? armorWithBuiltIns(item);
              const builtInText = (item.builtIns || []).map((b) => modifierText(b)).join(", ");
              const slots = allowedSlotsForItem(item);
              const equipped = isItemEquipped(hero, item);
              return (
                <TableRow key={item.id} hover selected={equipped} aria-selected={equipped}>
                  <TableCell>
                    <Typography component="span">{name}</Typography>
                    {equipped && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="success.main"
                        sx={{ ml: 1, fontWeight: 700 }}
                      >
                        *EQUIPPED*
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.enchantment ? (
                      <Typography variant="body2" color="info.main">
                        {getEnchantmentDisplay(item.enchantment)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        —
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell align="right">{item.level}</TableCell>
                  <TableCell align="right">{baseDmg ?? "—"}</TableCell>
                  <TableCell align="right">{baseArmor ?? "—"}</TableCell>
                  <TableCell>
                    {builtInText ? (
                      <Typography variant="caption">{builtInText}</Typography>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        —
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {slots.length ? (
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        {slots.map((s) => (
                          <Button
                            key={s}
                            size="small"
                            variant="outlined"
                            disabled={disabled}
                            aria-label={`Equip ${name} to ${s}`}
                            onClick={() => onEquip(s, item.id)}
                          >
                            {s === "leftHand" ? "Left" : s === "rightHand" ? "Right" : "Equip"}
                          </Button>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        —
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No items match your filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
        <Typography variant="caption">
          Showing {pageItems.length} of {sorted.length} items
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            onClick={() => setPage(0)}
            disabled={currentPage === 0}
            aria-label="First page"
          >
            « First
          </Button>
          <Button
            size="small"
            onClick={() => setPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            ‹ Prev
          </Button>
          <Typography variant="caption" component="span" aria-live="polite">
            Page {currentPage + 1} / {totalPages}
          </Typography>
          <Button
            size="small"
            onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
          >
            Next ›
          </Button>
          <Button
            size="small"
            onClick={() => setPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
            aria-label="Last page"
          >
            Last »
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
