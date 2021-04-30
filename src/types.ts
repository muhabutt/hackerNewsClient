export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type Comment = {
  by: string;
  id: number;
  kids: Array<number>;
  parent: number;
  text: string;
  time: number;
  title: string;
  type: string;
};

/*Combined Type story and comment*/
export type Data = {
  by: string;
  descendants?: number;
  id: number;
  kids: Array<number>;
  parent?: number;
  text?: string;
  score?: number;
  time: number;
  title: string;
  type: string;
  url?: string;
};

/*Route type Route name should be the key values are props passed automatically*/
export type CommentNavigatorParamsList = {
  Comment: {story: Story};
};
