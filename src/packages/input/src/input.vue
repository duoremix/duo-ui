<template>
  <div
    class="duo-input"
    :class="{
      'is-disabled': disabled
    }"
    @mouseover="hover = true"
    @mouseout="hover = false">
    <template v-if="type != 'textarea'">
      <span
        v-if="prefixIcon"
        class="duo-input__prefix-icon">
        <i class="fa" :class="prefixIcon"></i>
      </span>
      <input
        class="duo-input__inner"
        :class="{
          'duo-input__prefix': prefixIcon,
          'duo-input__suffix': suffixIcon
        }"
        :name="name"
        :type="type"
        :maxlength="maxlength"
        :minlength="minlength"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="childValue"
        @focus="focus = true"
        @blur="focus = false">
        <span
          v-if="clearable"
          v-show="(focus || hover) && !isNull"
          class="duo-input__clear"
          @click="clear">
          <i class="fa fa-close"></i>
        </span>
        <span
          v-if="suffixIcon"
          class="duo-input__suffix-icon">
          <i class="fa" :class="suffixIcon"></i>
        </span>
    </template>
    <template v-else>
      <textarea
        class="duo-textarea__inner"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="childValue">
      </textarea>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'DuoInput',
    componentName: 'DuoInput',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      value: [String, Number],
      maxlength: [Number],
      minlength: [Number],
      placeholder: String,
      clearable: Boolean,
      disabled: Boolean,
      name: String,
      suffixIcon: String,
      prefixIcon: String
    },
    data() {
      return {
        childValue: '',
        focus: false,
        hover: false
      }
    },
    computed: {
      isNull() {
        return this.childValue === '' || this.childValue === null || this.childValue === undefined
      }
    },
    methods: {
      change(value) {
        this.$emit('input', value)
      },
      clear() {
        this.childValue = ''
      }
    },
    watch: {
      'childValue'() {
        this.change(this.childValue)
      },
      'value'() {
        if (this.value !== this.childValue) {
          this.childValue = this.value
        }
      }
    }
  }  
</script>

<style scoped>
.duo-input {
  display: inline-block;
  position: relative;
}
.duo-input__inner,
.duo-textarea__inner {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border .5s;
}
.duo-input__inner {
  padding: 0 15px;
  height: 40px;
}
.duo-input__inner.duo-input__prefix {
  padding-left: 30px;
}
.duo-input__inner.duo-input__suffix {
  padding-right: 30px;
}
.duo-textarea__inner {
  padding: 5px 15px;
  box-sizing: border-box
 }
.duo-input.is-disabled .duo-input__inner,
.duo-input.is-disabled .duo-textarea__inner {
  border-color: #e4e7ed;
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}
.duo-input__inner:focus,
.duo-textarea__inner:focus {
  border: 1px solid #409eff;
  transition: border .5s;
}
input.duo-input__inner::-webkit-outer-spin-button,
input.duo-input__inner::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input.duo-input__inner.[type="number"] {
   -moz-appearance: textfield;
}
.duo-input .duo-input__prefix-icon,
.duo-input .duo-input__suffix-icon,
.duo-input .duo-input__clear {
  position: absolute;
  top: 50%;
}
.duo-input .duo-input__prefix-icon,
.duo-input .duo-input__suffix-icon {
  margin-top: -10px;
  color: #c0c4cc;
  font-size: 16px;
}
.duo-input .duo-input__prefix-icon {
  left: 10px;
}
.duo-input .duo-input__suffix-icon {
  right: 10px;
}
.duo-input .duo-input__clear {
  right: 6px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, .2);
  cursor: pointer;
}
</style>