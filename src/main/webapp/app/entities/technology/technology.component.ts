import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITechnology } from '@/shared/model/technology.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TechnologyService from './technology.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Technology extends mixins(AlertMixin) {
  @Inject('technologyService') private technologyService: () => TechnologyService;
  private removeId: number = null;

  public technologies: ITechnology[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTechnologys();
  }

  public clear(): void {
    this.retrieveAllTechnologys();
  }

  public retrieveAllTechnologys(): void {
    this.isFetching = true;

    this.technologyService()
      .retrieve()
      .then(
        res => {
          this.technologies = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITechnology): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTechnology(): void {
    this.technologyService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Technology is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTechnologys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
