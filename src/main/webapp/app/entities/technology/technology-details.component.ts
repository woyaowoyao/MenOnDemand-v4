import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITechnology } from '@/shared/model/technology.model';
import TechnologyService from './technology.service';

@Component
export default class TechnologyDetails extends Vue {
  @Inject('technologyService') private technologyService: () => TechnologyService;
  public technology: ITechnology = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.technologyId) {
        vm.retrieveTechnology(to.params.technologyId);
      }
    });
  }

  public retrieveTechnology(technologyId) {
    this.technologyService()
      .find(technologyId)
      .then(res => {
        this.technology = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
