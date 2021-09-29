<template>
  <div>
    <el-card class="box-card">
      <el-radio v-model="radio" @change="postIntent()" label="invoiceValidation">
        <span class="radioText">
          <strong>{{cardValue.botName}} [{{cardValue.botAlias}}]</strong>
        </span>
      </el-radio>
      <el-button style="float: right; padding: 5px 5px 5px" type="danger" plain>Delete</el-button>
      <el-button
        style="float: right; padding: 5px 5px 5px; margin-right: 10px"
        type="primary"
        plain
      >Edit</el-button>
    </el-card>
    
  </div>
</template>

<script>
export default {
  props: ["cardValue", "radio"],
  data() {
    return {};
  }
};
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
