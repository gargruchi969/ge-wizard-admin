<template>
  <div class="container" v-loading="loading">
    <h3>CURRENT VERSION</h3>

    <div>
      <el-card class="box-card">
        <div>
          <p>
            Bot Name:
            <strong>{{cardValue.botName}}</strong>
          </p>
          <p>
            Alias:
            <strong>{{cardValue.botAlias}}</strong>
          </p>
          <p>
            Version:
            <strong>{{cardValue.botVersion}}</strong>
          </p>
        </div>

        <el-button
          style="float: left; padding: 10px 10px 10px; margin-bottom: 20px"
          type="primary"
          plain
          @click="toggleEditPanel()"
        >EDIT</el-button>
        <el-button
          disabled
          style="float: right; padding: 10px 10px 10px; margin-bottom: 20px"
          type="danger"
          plain
        >STOP</el-button>
      </el-card>
    </div>

    <div v-if="editPanel">
      <el-card class="input-card box-card">
        <div class="selectCSS">
          <p style="display: inline-block;" > (1/3) Lex Bot Name:    </p>
          <select style="display: inline-block; text-align:right"  required v-model="inputBotName" value="Bot Name">
            <option v-for="(value, index) in bots" :key="index">{{value.name}}</option>
          </select>
        </div>
        <div class="selectCSS" v-if="showAlias">
          <p style="display: inline-block;"> (2/3) Lex Bot Alias: </p>
          <select style="display: inline-block;" required v-model="inputAlias" value="Alias Name">
            <option v-for="(value, index) in alias" :key="index">{{value.name}}</option>
          </select>
        </div>
        <div class="selectCSS" v-if="showVersion">
          <p style="display: inline-block;"> (3/3) Lex Bot Version: </p>
          <select style="display: inline-block;" required v-model="inputVersion" value="Alias Name">
            <option v-for="(value, index) in version" :key="index">{{value.version}}</option>
          </select>
        </div>
     

        <el-button
          style="float: left; padding: 10px 10px 10px; margin-bottom: 20px; margin-top:20px"
          type="success"
          @click="saveNewBot()"
          plain
        >SAVE</el-button>
         <el-button
          style="float: right; padding: 10px 10px 10px; margin-bottom: 20px; margin-top:20px"
          type="danger"
           @click="toggleEditPanel()"
          plain
        >CANCEL</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IntentsCard from "@/components/IntentsCard.vue";
import aws4 from "aws4-tiny";
import vSelect from 'vue-select'

export default {
  name: "HelloWorld",
  components: {
    IntentsCard
  },
  data() {
    return {
      radio: "",
      loading: false,
      inputBotName: "",
      inputAlias: "",
      inputVersion: "",
      cardValue: {
        botName: "",
        botAlias: "",
        botVersion: ""
      },
      bots: [],
      alias: [],
      version: [],
      newBot: false,
      editPanel: false,
      showAlias: false,
      showVersion: false,
    };
  },
  watch: {
    inputBotName() {
      this.getBotAlias();
      this.showAlias = true;
    },
    inputAlias() {
      this.getBotVersions();
      this.showVersion = true;
    }
  },
  mounted() {
    this.getIntentValue();
    this.getBotOptions();
  },
  methods: {
    toggleEditPanel() {
      console.log("insideedit");
      this.editPanel = !this.editPanel;
    },
    saveNewBot() {
      this.toggleEditPanel();
      console.log(this.inputBotName, this.inputAlias, this.inputVersion);
      this.newBot = true;

      this.postIntent(this.inputBotName, this.inputAlias, this.inputVersion);
      //this.getIntentValue()
    },
    getBotAlias() {
      var credentials = {
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: "" // only required for temporary credentials
      };
      let here = this;

      aws4
        .fetch(
          `https://models.lex.us-west-2.amazonaws.com/bots/${here.inputBotName}/aliases/`,
          {
            service: "lex",
            region: "us-west-2"
          },
          credentials
        )
        .then(function(response) {
          response.json().then(function(data) {
            console.log("resp", data.BotAliases);
            here.alias = data.BotAliases;
          });
        });
    },
    getBotVersions() {
      var credentials = {
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: "" // only required for temporary credentials
      };
      let here = this;

      aws4
        .fetch(
          `https://models.lex.us-west-2.amazonaws.com/bots/${here.inputBotName}/versions/`,
          {
            service: "lex",
            region: "us-west-2"
          },
          credentials
        )
        .then(function(response) {
          response.json().then(function(data) {
            console.log("resp", data.bots);
            here.version = data.bots;
          });
        });
    },
    getBotOptions() {
      var credentials = {
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: "" // only required for temporary credentials
      };
      let here = this;

      aws4
        .fetch(
          "https://models.lex.us-west-2.amazonaws.com/bots/",
          {
            service: "lex",
            region: "us-west-2"
          },
          credentials
        )
        .then(function(response) {
          response.json().then(function(data) {
            console.log("resp", data.bots);
            here.bots = data.bots;
          });
        });
    },
    getIntentValue() {
      let here = this;
      this.loading = true;
      axios
        .get(
          "https://dz8ojj03s4.execute-api.us-west-2.amazonaws.com/dev/intent"
        )
        .then(function(response) {
          here.cardValue.botName = response.data.body.botName;
          here.cardValue.botAlias = response.data.body.alias;
          here.cardValue.botVersion = response.data.body.version;
          here.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    open1() {
      this.$notify({
        title: "SUCCESS",
        message: `Wizard's current intent is changed to BOT: ${this.cardValue.botName}, ALIAS:  ${this.cardValue.botAlias}, VERSION: ${this.cardValue.botName}`,
        type: "success"
      });
    },
    open4() {
      this.$notify.error({
        title: "ERROR",
        message:
          "Due to some server error, not able to change Wizard's current intent!"
      });
    },
    postIntent(botName, botAlias, botVersion) {
      let here = this;
      this.loading = true;
      axios
        .post(
          "https://dz8ojj03s4.execute-api.us-west-2.amazonaws.com/dev/intent",
          {
            headers: { "Access-Control-Allow-Origin": "*" },
            currentIntent: `${this.inputBotName}`,
            currentAlias: `${this.inputAlias}`,
            currentVersion: `${this.inputVersion}`
          }
        )
        .then(function(response) {
          console.log(response);
          here.cardValue.botName = response.data.body.botName;
          here.cardValue.botAlias = response.data.body.alias;
          here.cardValue.botVersion = response.data.body.version;
          here.loading = false;
          here.open1();
        })
        .catch(function(error) {
          console.log(error);
          here.open4();
          here.loading = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-radio.is-bordered.is-checked {
  border-color: #3b73b9 !important;
}
.intentLists {
  float: center;
}
.box-card {
  margin: 10px !important;
}
.input-card {
  max-width: 50% !important;
}
.radioText {
  color: #3b73b9 !important;
}
.options {
  margin-top: 2%;
}
.container {
  margin: 2%;
  text-align: left !important;
}
select{
  width: 200px !important;
}
.selectCSS{
  // margin-bottom: 5px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
