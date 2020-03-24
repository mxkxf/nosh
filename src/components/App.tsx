import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import ItemList from "./ItemList";
import ItemView from "./ItemView";
import Onboarding from "./Onboarding";
import SubscribeFeedModal from "./SubscribeFeedModal";
import { retrieveFeeds } from "../state/actions";
import { Dispatch } from "redux";
import { InitialState } from "../state/reducers";

interface Props {
  feeds: Feed[];
  isLoading: boolean;
  isSubscribeFeedModalOpen: boolean;
  retrieveFeeds: () => {};
  selectedFeed: number | null;
}

const App: React.FC<Props> = ({
  feeds,
  isLoading,
  isSubscribeFeedModalOpen,
  retrieveFeeds,
  selectedFeed,
}) => {
  React.useEffect(() => {
    retrieveFeeds();
  }, [retrieveFeeds]);

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
  feeds: state.feeds,
  isLoading: state.ui.isLoading,
  isSubscribeFeedModalOpen: state.ui.isSubscribeFeedModalOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveFeeds: () => dispatch(retrieveFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
