import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Cached from "@mui/icons-material/Cached";
import Star from "@mui/icons-material/Star";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import copy from "copy-to-clipboard";
import { Snackbar } from "@mui/material";

export default function InsetList() {
  const [d, sD] = useState(null);
  const [l, sL] = useState(false);
  const [v, sV] = useState("0");
  const [o, sO] = useState(false);
  const newv = "1.5";
  const g = () => {
    sL(true);
    fetch("http://114.115.247.94:8124/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sD(res.rk);
        setTimeout(() => {
          sL(false);
        }, 1000);
      });
  };
  useEffect(() => {
    g();
    sV(window.v);
  }, []);
  return (
    <>
      {/* <div>{v}</div> */}
      <Fab
        size="small"
        color="primary"
        sx={{ position: "fixed", right: "calc(50vw - 20px)", bottom: "10px" }}
        onClick={g}
      >
        {l ? (
          <CircularProgress sx={{ color: "white", padding: "10px" }} />
        ) : (
          <Cached />
        )}
      </Fab>
      {newv != v && (
        <Fab
          variant="extended"
          sx={{
            position: "fixed",
            right: "10px",
            bottom: "15px",
            textTransform: "lowercase",
          }}
          size="small"
          color="secondary"
          onClick={() => {
            sO(true);
            copy("http://114.115.247.94:5244/1/2O48");
          }}
        >
          <FiberNewIcon sx={{ mr: 0.5 }} /> {v ? "v" + v : "1.2"}
          {" -> "}
          {"v" + newv}
        </Fab>
      )}
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "70vh",
        }}
      >
        {(d || []).map((r, i) => (
          <ListItem key={r.name} disablePadding secondaryAction={r.score}>
            <ListItemButton>
              <ListItemIcon sx={{ textAlign: "center" }}>
                {i == 0 ? <Star sx={{ color: "gold" }} /> : i + 1}
              </ListItemIcon>
              <ListItemText primary={r.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={o}
        autoHideDuration={800}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(_: any, reason: string) => {
          if (reason === "clickaway") {
            return;
          }

          sO(false);
        }}
        message="下载链接已复制到剪切板！"
      />
    </>
  );
}
