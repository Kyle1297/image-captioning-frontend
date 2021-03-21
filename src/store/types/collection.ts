export const GET_COLLECTIONS = 'GET_COLLECTIONS';
export const GET_COLLECTION = 'GET_COLLECTION';
export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export const REMOVE_COLLECTION = 'REMOVE_COLLECTION';


export interface Collection {
	id: number;
  category: string;
  is_main?: boolean;
};


// initial states
export type CollectionsState = {
  collections: Collection[];
};

export type CollectionState = {
	collection: Collection | null;
};


// actions
interface GetCollectionsAction {
  type: typeof GET_COLLECTIONS;
  payload: Collection[];
};

interface GetCollectionAction {
	type: typeof GET_COLLECTION;
	payload: Collection;
};

interface CreateCollectionAction {
  type: typeof CREATE_COLLECTION;
  payload: Collection;
};

interface UpdateCollectionAction {
	type: typeof UPDATE_COLLECTION;
	payload: Collection;
};

interface RemoveCollectionAction {
	type: typeof REMOVE_COLLECTION;
};

export type CollectionsActionTypes = GetCollectionsAction

export type CollectionActionTypes = GetCollectionAction | CreateCollectionAction | 
                                    UpdateCollectionAction | RemoveCollectionAction;


