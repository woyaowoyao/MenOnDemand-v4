import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { ITechnology, Technology } from '@/shared/model/technology.model';
import TechnologyService from './technology.service';

const validations: any = {
  technology: {
    name: {
      required,
    },
    toc: {},
    preprequisites: {},
  },
};

@Component({
  validations,
})
export default class TechnologyUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('technologyService') private technologyService: () => TechnologyService;
  public technology: ITechnology = new Technology();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.technologyId) {
        vm.retrieveTechnology(to.params.technologyId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.technology.id) {
      this.technologyService()
        .update(this.technology)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Technology is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.technologyService()
        .create(this.technology)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Technology is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTechnology(technologyId): void {
    this.technologyService()
      .find(technologyId)
      .then(res => {
        this.technology = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
