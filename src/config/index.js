const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://test-odc.rubikstack.com"
    : "";
/**
 *  fetch
 */
function hashStr(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; 
  }
  return hash;
}
function readCache(url, options, res) {
  return JSON.parse(sessionStorage.getItem(hashStr(url  + JSON.stringify(options))));
}
function cacheFetch(url, options, res) {
  sessionStorage.setItem(hashStr(url + JSON.stringify(options)), JSON.stringify(res));
}
const $fetch = {
  base: (url, options, noCache) => {
    const { params } = options;
    if (!url) {
      throw new Error("url is empty, 请求路径未设置");
    }
    if (params) {
      const str = Object.entries(params)
        .map(ele => ele.join("="))
        .join("&");
      if (url.includes("?")) {
        url += `&${str}`;
      } else {
        url += `?${str}`;
      }
      Reflect.deleteProperty(options, "params");
    }
    if (!noCache) {
      const cachedData = readCache(baseUrl + url, options);
      if (cachedData) {
        return Promise.resolve(cachedData);
      }
    }

    return fetch(baseUrl + url, { ...options })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }

        throw new Error(res.status);
      })
      .then(res => res.json())
      .then(res => {
        const result = res.result || {};
        !noCache && cacheFetch(baseUrl + url, options, result);
        return result;
      });
  },

  get(url, options, noCache) {
    return this.base(
      url,
      { ...options, method: "get" },
      noCache
    );
  },
  post(url, options) {
    return this.base(url, {
      header: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "same-origin",
      ...options,
      method: "post"
    });
  },
  put(url, options) {
    return this.base(url, {
      header: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "same-origin",
      ...options,
      method: "put"
    });
  },
  delete(url, options) {
    return this.base(url, {
      credentials: "same-origin",
      ...options,
      method: "delete"
    });
  }
};

/**
 *  api_config
 */
const apis = {
  wechat: {
    config: "/wechat/js-sdk/config" // 微信签名授权
  },
  overall: {
    index: "/smart/overall", // 总体运营
    medical_income: "/smart/overall/medical_income", // 医疗总收入
    outpatient: "/smart/overall/outpatient", // 总门诊量
    medical_examination: "/smart/overall/medical_examination", // 总体检人数
    surgery: "/smart/overall/surgery", // 总手术台数
    hospitalized: "/smart/overall/hospitalized" // 住院在院人数
  },
  emergency: {
    index: "/smart/emergency", // 门急诊
    department_distribution: "/smart/emergency/department_distribution" // 门诊量科室分布
  },
  hospitalization: {
    department_distribution: "/smart/hospitalization/department_distribution" // 住院在院人数科室分布
  }
};

export { $fetch, apis };
