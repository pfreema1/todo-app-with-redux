// @flow

export type DispatchObject = {
  type: string,
  input?: string,
  editInput?: string,
  id?: string,
  text?: string,
  filter?: string
};

export type TodoObject = {
  id: string,
  text: string,
  finished: boolean,
  keyTick: string,
  isBeingEdited: boolean
};
