<template>
  <div id="app">
    <div class="container">
      <div class="input">
        <input type="text" placeholder="输入待办事项" v-model="currentVal">
        <button @click="add">提交</button>
      </div>

      <div class="list">
        <div class="list-item" v-for="(item, index) in listFilter" :key="index">
          <input type="checkbox" :checked="item.done" @change="change(item.id)">
          <p>{{ item.task }}</p>
          <a @click="removeItem(item.id)" href="javascript:void(0);">删除</a>
        </div>
        <div v-if="listFilter.length <= 0">
          暂未有
        </div>
      </div>

      <div class="control">
        <p>{{ noDoneNum }}条未办</p>
        <div>
          <p @click="changeTabType(`all`)" :class="type === `all` ? `active` : ``">所有</p>
          <p @click="changeTabType(`yes`)" :class="type === `yes` ? `active` : ``">已办</p>
          <p @click="changeTabType(`no`)" :class="type === `no` ? `active` : ``">未办</p>
        </div>
        <a @click="removeAllNo" href="javascript:void(0);">删除所有已办</a>
      </div>

    </div>

  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

  export default {
    name: 'App',
    data() {
      return {
        currentVal: "",
        type: "all"
      }
    },
    mounted() {
    },
    computed: {
      ...mapState(["list"]),
      ...mapGetters(["listFilter", "noDoneNum"])
    },
    methods: {
      ...mapMutations(["changeDone", "remove", "changeType", "removeDoneFalse"]),
      add() {
        var val = this.currentVal;
        this.$store.commit("add", val);
        this.currentVal = "";
      },
      removeItem(id) {
        this.remove(id);
      },
      change(id) {
        this.changeDone(id);
      },
      changeTabType(type) {
        this.type = type;
        this.changeType(type);
      },
      removeAllNo() {
        this.removeDoneFalse();
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    margin: 0 auto;
    width: 500px;
    padding-top: 10px;
  }

  .input {
    margin-bottom: 10px;
  }

  .list {
    padding: 15px 10px;
    background: #eee;
    margin-bottom: 10px;

    .list-item {
      display: flex;
      align-items: center;
      height: 24px;

      &:hover {
      }

      input {
        margin-right: 10px;
      }

      a {
        margin-left: auto;
        text-decoration: none;
        font-size: 14px;
      }
    }
  }

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;

      p {
        background: #2c3e50;
        color: #fff;
        padding: 5px 3px;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          background: #f38f00;
        }

        &.active {
          background: #42b983;
          color: #fff;
        }
      }

      p:nth-child(2) {
        margin: 0 10px;
      }
    }

  }


</style>
