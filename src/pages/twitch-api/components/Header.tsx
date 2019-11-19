import React, { useState } from "react";
import { Container, Button, Input } from "reactstrap";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";

interface HeaderProps {
  onNewStreamer: (streamer) => void;
}

const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  const [streamer, setStreamer] = useState("");
  const [show, setShow] = useState("all");
  const { onNewStreamer } = props;

  const onAnimate = (nodes: HTMLCollection, hide: boolean): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      // eslint-disable-next-line func-names
      (function(i): void {
        setTimeout((): void => {
          if (hide) {
            nodes[i].className = "user__container animated fadeOutLeft";
            setTimeout((): void => {
              nodes[i].className = "hidden";
            }, 500);
          } else {
            nodes[i].className = "user__container animated fadeInLeft";
          }
        }, 500 * i);
      })(i);
    }
    return true;
  };

  const onOnlineChange = (): void => {
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "all":
        onAnimate(offline, true);
        break;
      case "offline":
        onAnimate(offline, true);
        onAnimate(online, false);
        break;
      default:
        return;
    }
    setShow("online");
  };

  const onAllChange = (): void => {
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "online":
        onAnimate(offline, false);
        break;
      case "offline":
        onAnimate(online, false);
        break;
      default:
        return;
    }
    setShow("all");
  };

  const onOfflineChange = (): void => {
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "all":
        onAnimate(online, true);
        break;
      case "online":
        onAnimate(online, true);
        onAnimate(offline, false);
        break;
      default:
        return;
    }
    setShow("offline");
  };

  return (
    <div className="twitch__header">
      <HiddenNavBar color="rgb(163, 65, 255)" />
      <Container>
        <h1 className="text-center twitch__title">Twitch Streamers</h1>
        <p className="twitch__header-text">
          Feel free to add any streamers you wish to track. All streamers are saved so you
          can come back and check their status.
        </p>
        <p className="twitch__header-subtext">
          You can also remove any streamers you don&apos;t want to follow by pressing the
          red cross.
        </p>
        <div className="twitch__buttons-container">
          <Button
            className="twitch__button"
            active={show === "online"}
            size="lg"
            outline
            color="success"
            onClick={onOnlineChange}
          >
            Online
          </Button>
          <Button
            className="twitch__button"
            active={show === "all"}
            size="lg"
            outline
            color="warning"
            onClick={onAllChange}
          >
            All
          </Button>
          <Button
            className="twitch__button"
            active={show === "offline"}
            size="lg"
            outline
            color="danger"
            onClick={onOfflineChange}
          >
            Offline
          </Button>
        </div>
        <div className="twitch__input-container">
          <Input
            id="streamer-input"
            value={streamer}
            onChange={(e): void => setStreamer(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent): void => {
              if (e.keyCode === 13) {
                onNewStreamer(streamer);
                setStreamer("");
              }
            }}
            placeholder="Enter new streamer here"
          />
          <Button
            id="streamer-btn"
            outline
            color="info"
            onClick={(): void => {
              onNewStreamer(streamer);
              setStreamer("");
            }}
          >
            Add Streamer
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Header;
