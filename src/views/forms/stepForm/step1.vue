<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账户' }]
            }
          ]"
          placeholder = "请输入付款账户" />
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <receiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [{ 
                required: true, 
                message: '请输入收款账户',  
                validator: (rule, value, callback) => {
                  if (value && value.number) {
                    callback()
                  } else {
                    callback(false)
                  }
                }
              }]
            }
          ]" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import receiverAccount from "@/components/receiverAccount"
export default {
  components: { receiverAccount },
  data () {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: { // 表单布局
        labelCol: { span: 4 },
        wrapperCol: { span: 14 } 
      }
    }
  },
  computed: {
    step () {
      return this.$store.state.form.step
    }
  },
  methods: {
    handleSubmit () {
      const { form, $router, $store } = this
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          })
          $router.push({path: "/form/step-form/confirm"})
        };
      })
    }
  }
}
</script>

<style>

</style>
