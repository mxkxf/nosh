import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Header from "./Header";
import ItemList from "./ItemList";
import ItemView from "./ItemView";
import Onboarding from "./Onboarding";
import { AnalyticsContext } from "./AnalyticsProvider";
import SubscribeFeedModal from "./SubscribeFeedModal";
import { retrieveFeeds } from "../state/actions";
import { InitialState } from "../state/reducers";

interface Props {
  isLoading: boolean;
  isSubscribeFeedModalOpen: boolean;
  retrieveFeeds: () => {};
  selectedFeed: number | null;
}

const App: React.FC<Props> = ({
  isLoading,
  isSubscribeFeedModalOpen,
  retrieveFeeds,
  selectedFeed,
}) => {
  React.useEffect(() => {
    retrieveFeeds();
  }, [retrieveFeeds]);

  const { isLoaded, trackPage } = React.useContext(AnalyticsContext);

  React.useEffect(() => {
    if (isLoaded) {
      trackPage();
    }
  }, [isLoaded, trackPage]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen text-black antialiased md:flex">
        <Header />
        <main className="flex-1 md:flex bg-gray-100">
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
      {isSubscribeFeedModalOpen && <SubscribeFeedModal />}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed,
  isLoading: state.ui.isLoading,
  isSubscribeFeedModalOpen: state.ui.isSubscribeFeedModalOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveFeeds: () => dispatch(retrieveFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
