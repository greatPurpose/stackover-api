<template>
  <div v-if="loading">
    <div class="loading-screen">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
  <div class="wrapper" v-else>
    <div class="main main-raised">
      <div class="query-card section section-basic">
        <div class="container">
          <md-list class="md-triple-line" v-if="isQueries">
            <div v-for="(item, index) in queries" :key="index">
              <md-list-item>
                <md-avatar>
                  <img :src="item.owner.profile_image" alt="People" />
                </md-avatar>

                <div class="md-list-item-text" @click="showQueryModal(item)">
                  <span>{{ item.owner.display_name }}</span>
                  <span>{{ item.creation_date }}</span>
                  <p>{{ item.title }}</p>
                </div>
              </md-list-item>

              <md-divider
                class="md-inset"
                v-if="isDrawLine(index)"
              ></md-divider>
            </div>
          </md-list>
          <modal v-if="showModal">
            <template slot="header">
              <h4 class="modal-title">{{ modal.owner_name }}</h4>
              <md-button
                class="md-simple md-just-icon md-round modal-default-button"
                @click="showModal = false"
              >
                <md-icon>clear</md-icon>
              </md-button>
            </template>

            <template slot="body">
              <a :href="modal.link" target="_blank">
                <p>
                  {{ modal.title }}
                </p>
              </a>
            </template>

            <template slot="footer">
              <md-button class="md-danger md-simple" @click="showModal = false"
                >Close</md-button
              >
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from "@/components";

export default {
  components: {
    Modal
  },
  name: "index",
  data() {
    return {
      queries: [],
      showModal: false,
      loading: true,
      modal: {
        title: "",
        link: "",
        owner_name: ""
      }
    };
  },
  computed: {
    isQueries() {
      return this.queries.length !== 0;
    }
  },
  methods: {
    hideModal() {
      this.isShown = false;
    },
    isDrawLine(index) {
      return this.queries.length > 1 && index < this.queries.length - 1;
    },
    showQueryModal(item) {
      this.modal.title = item.title;
      this.modal.link = item.link;
      this.modal.owner_name = item.owner.display_name;
      this.showModal = true;
    }
  },
  async mounted() {
    try {
      let res = await axios.get(
        "https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&site=stackoverflow"
      );
      this.queries = res.data.items;
    } catch {}
    this.loading = false;
  }
};
</script>
<style lang="scss" scoped>
.query-card {
  margin-top: 150px;
}

.md-progress-spinner {
  margin: 24px;
}

.loading-screen {
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
