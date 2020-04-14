import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { retrieveFeeds } from "../state/actions";
import { InitialState } from "../state/reducers";
import Header from "./Header";
import ItemList from "./ItemList";
import ItemView from "./ItemView";
import Onboarding from "./Onboarding";
import SubscribeFeedModal from "./SubscribeFeedModal";
import AboutModal from "./AboutModal";

interface Props {
  isAboutModalOpen: boolean;
  isSubscribeFeedModalOpen: boolean;
  retrieveFeeds: () => {};
  selectedFeed: number | null;
}

const App: React.FC<Props> = ({
  isAboutModalOpen,
  isSubscribeFeedModalOpen,
  retrieveFeeds,
  selectedFeed,
}) => {
  // React.useEffect(() => {
  //   retrieveFeeds();
  // }, [retrieveFeeds]);

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@mikefrancis/strata.js";
    script.async = true;
    script.onload = () => {
      (window as any).Strata.init(process.env.REACT_APP_STRATA_KEY);
      (window as any).Strata.page();
    };

    document.body.append(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex">
        <Header />
        <main className="flex-1 flex">
          {selectedFeed !== null ? (
            <>
              <ItemList />
              <ItemView />
            </>
          ) : (
            <Onboarding />
          )}
        </main>
      </div>
      {isAboutModalOpen && <AboutModal />}
      {isSubscribeFeedModalOpen && <SubscribeFeedModal />}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed,
  isAboutModalOpen: state.ui.isAboutModalOpen,
  isSubscribeFeedModalOpen: state.ui.isSubscribeFeedModalOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveFeeds: () => dispatch(retrieveFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
