import { createClient } from "redis";


class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.connect();
    this.alive = true;
    this.client.on("error", (error) => {
      console.log(error);
      this.alive = false;
    });

    this.client.once("ready", () => {
      this.alive = true;
      console.log("Redis ready");
    });
  }

  isAlive() {
    return this.alive;
  }

  async get(key) {
    try {
      // this.client.get = await promisify(this.client.get).bind(this.client);
      return await this.client.get(key);
    } catch (error) {
      console.log(error);
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, "EX", duration);
    } catch (error) {
      console.log(error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.log(error);
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
  