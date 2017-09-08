export interface pr { a: string, b: number };

export namespace db {

  //对数据库campaign表的定义
  export interface ICampaign {
    id: number;
    year: number;
    name: string,
    seriesNO: string,
    type: number,
    hasSJV: boolean,
    hasBUX: boolean,
    budget: number,//预算
    startTime: number,//开始时间
    endTime: number,
    createTime: number,
    createUserId: number,
    CAMPAIGN_12M:
    {
      m1: number,
      m2: number,
      m3: number,
      m4: number,
      m5: number,
      m6: number,
      m7: number,
      m8: number,
      m9: number,
      m10: number,
      m11: number,
      m12: number
    },
    lastUpdateTime: number
  }


}

export namespace webapi {

  export namespace body {
    // for api: .......
    export interface get_user {
      id: number;//数量和什么事没事没事没什么的
      name: string;
    }
  }

  export namespace query {
    // for api: .......
    export interface get_user {
      id: number;//数量和什么事没事没事没什么的大幅度发答复地方大幅度发发的发的发上方方法打发斯蒂芬
    }
    //GET /api/campaigns?length=<length>
    export interface get_campaigns {
      length: number;//返回的campain数量
    }

  }

  export namespace response {
    export interface get_campaigns extends db.ICampaign {
      extra_field1: number,
      extra_field2: string,
    }
  }

}

