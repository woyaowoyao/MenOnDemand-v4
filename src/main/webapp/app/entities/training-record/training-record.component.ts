import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITrainingRecord } from '@/shared/model/training-record.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TrainingRecordService from './training-record.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TrainingRecord extends mixins(AlertMixin) {
  @Inject('trainingRecordService') private trainingRecordService: () => TrainingRecordService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public trainingRecords: ITrainingRecord[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTrainingRecords();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllTrainingRecords();
  }

  public retrieveAllTrainingRecords(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.trainingRecordService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.trainingRecords = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITrainingRecord): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTrainingRecord(): void {
    this.trainingRecordService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TrainingRecord is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTrainingRecords();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllTrainingRecords();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
