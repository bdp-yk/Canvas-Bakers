import { createStore } from 'redux';

import rootReducer from '../reducers';
import { handleStoreUpdates } from '../../helpers/local-storage.helpers';
// import DevTools from '../components/DevTools';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  // Commit all relevant changes to the state to localStorage, for quick
  // hydration next visit.
  store.subscribe(() => {
    handleStoreUpdates(store);
  });

  return store;
}
