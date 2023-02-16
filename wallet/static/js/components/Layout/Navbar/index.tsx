import React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks";
import { useDispatch } from "react-redux";
import { Logo, UnlockBtn } from "components";
import { useApiRequests } from "helpers";
import { setUsdValue } from "redux/slices";
import { ReactComponent as Rocket } from "../../../assets/images/rocket.svg";
import Account from "./Account";
import useLogout from "./useLogout";

export default function Navbar() {
  const { address } = useGetAccountInfo();

  const loggedIn = Boolean(address);
  const { getUsdPrice } = useApiRequests();
  const dispatch = useDispatch();
  const logout = useLogout();

  const fetchUsdValue = () => {
    getUsdPrice().then(({ data, success }) => {
      if (success) {
        dispatch(setUsdValue(data.price));
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetchUsdValue, [address]);

  React.useEffect(() => {
    const receiveMessage = (ev: StorageEvent) => {
      if (ev.key !== "logoutEvent" || !ev.newValue) return;
      try {
        const { data } = JSON.parse(ev.newValue);
        if (data === address) {
          logout();
        }
      } catch (err) {
        return;
      }
    };

    if (address) {
      window.addEventListener("storage", receiveMessage);
    }

    return () => {
      window.removeEventListener("storage", receiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div className="main-navbar sticky-top mb-spacer">
      <div className="container">
        <nav className="navbar navbar-expand-sm align-items-stretch justify-content-between flex-nowrap p-0">
          <div className="d-flex align-items-center">
            <Logo />
          </div>
          <div className="d-none d-md-flex align-items-center">
            <div className="collapse navbar-collapse" id="navbarMenu">
              <div className="navbar-nav"></div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <a
              className="btn btn-sm btn-white ml-2"
              href="https://form.typeform.com/to/TzeoE5SU"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Rocket
                className="mr-2 d-none d-sm-inline-flex"
                style={{ width: "0.7rem", height: "0.7rem", fill: "#1f43f6" }}
              />
              Startups Apply
            </a>
            {loggedIn ? (
              <div
                className="d-flex align-items-center logged-in"
                style={{ minWidth: 0 }}
              >
                <Account />
              </div>
            ) : (
              <UnlockBtn className="ml-2" />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
