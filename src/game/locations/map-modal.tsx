import React, { useState } from "react";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";

import { useHero } from "src/hooks/use-hero";

export function MapModal(): JSX.Element | null {
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false);
  const hero = useHero();

  if (!hero) {
    return null;
  }

  return (
    <>
      <Modal open={mapModalOpen} onClose={() => setMapModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: [2, 4],
            minWidth: "320px",
            width: "90%",
            textAlign: "center",
          }}
        >
          <img
            src={`/maps/${hero.location.map}.jpg`}
            style={{ width: "100%" }}
          />
        </Box>
      </Modal>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={() => setMapModalOpen(true)}
      >
        <FullscreenIcon /> View Travelors Map
      </Fab>
    </>
  );
}
