<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="[
          'fieldA',
          {
            initialValue: fieldA,
            rules: [{ required: true, min: 6, message: '必须大于等于6个字符' }]
          }
        ]" 
        placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    this.form = this.$form.createForm(this)
    return {
      formLayout: 'horizontal',
      fieldA: "hello",
      fieldB: ""
    };
  },
  mounted () {
    setTimeout(() => {
      // form 里面得表单值 第一次 被初始化至后，以后想要动态修改他，必须通过form提供得 这个api来修改，才能把值存储在form中
      this.form.setFieldsValue({ fieldA: "hellow world" })
    }, 3000)
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : {};
    },
    buttonItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : {};
    },
  },
  methods: {
    handleFormLayoutChange  (e) {
      this.formLayout = e.target.value;
    },
    handleSubmit () {
      this.form.validateFields((err, values) => { // 校验数据
        if (!err) {
          console.log(values)
          // 当数据校验通过之后，把数据 同步到 vue实例this 得 fieldA 和 fieldB 
          // values 下有 fieldA 和 fieldB 属性/值
          Object.assign(this, values)
        }
      })
    }
  },
};
</script>