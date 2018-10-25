const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://test-odc.rubikstack.com"
    : "";
console.log(process.env.NODE_ENV);

/**
 *  fetch
 */
const $fetch = {
  base: (url, options) => {
    const { params } = options;
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
    return fetch(baseUrl + url, { ...options })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }

        throw new Error(res.status);
      })
      .then(res => res.json());
  },
  get(url, options) {
    return this.base(url, { ...options, method: "get" });
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
  overall: {
    index: "/smart/overall", // 总体运营
    medical_income: "/smart/overall/medical_income", // 医疗总收入
    outpatient: "/smart/overall/outpatient", // 总门诊量
    medical_examination: "/smart/overall/medical_examination" // 总体检人数
  },
  emergency: {
    index: "/smart/emergency", // 门急诊
    department_distribution: "/smart/emergency/department_distribution" // 门诊量科室分布
  }
};

export { $fetch, apis };
