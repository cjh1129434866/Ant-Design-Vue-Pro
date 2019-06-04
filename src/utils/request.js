import axios from "axios";
import { notification } from "ant-design-vue";

function request(option){
  return axios(option)
    .then(res => {
      return res
    })
    .catch(error => {
      const { response: { status, statusText } } = error;
      notification.error({
        // 下面使用 jsx 语法 给 弹窗提示信息 一点样式
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误: <span style="color: red">{status}</span> : {option.url}
          </div>
        ),
        description: statusText
      })
      return Promise.reject(error)
    });
}

export default request;