import axios from "axios";

class Sdk {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://04b3n0ge33.execute-api.us-east-1.amazonaws.com/dev";
  }

  private async call({ ...props }, authorizer: string | null) {
    const response = await axios({
      method: props.method,
      url: `${this.baseUrl}/${props.path}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizer,
      },
      ...props,
    });
    return response;
  }

  public async getPoints(address: string, apiKey: string, eventName?: string) {
    const response = await this.call(
      {
        method: "get",
        path: `points/${address}`,
        params: { eventName },
      },
      apiKey
    );
    return response.data;
  }

  public async addPoints(
    address: string,
    amount: number,
    eventName: string,
    apiKey: string
  ) {
    const response = await this.call(
      {
        method: "post",
        path: `add/points/${address}`,
        data: { points: amount, eventName },
      },
      apiKey
    );
    return response.data;
  }

  public async createProject(id?: string) {
    const response = await this.call(
      {
        method: "post",
        path: `project`,
        data: { id },
      },
      null
    );
    return response.data;
  }
}

let instance: Sdk | null = null;

export function getSdkInstance(): Sdk | null {
  if (!instance) {
    instance = new Sdk();
  }
  return instance;
}
