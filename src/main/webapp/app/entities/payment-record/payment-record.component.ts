import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPaymentRecord } from '@/shared/model/payment-record.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PaymentRecordService from './payment-record.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class PaymentRecord extends mixins(AlertMixin) {
  @Inject('paymentRecordService') private paymentRecordService: () => PaymentRecordService;
  private removeId: number = null;

  public paymentRecords: IPaymentRecord[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPaymentRecords();
  }

  public clear(): void {
    this.retrieveAllPaymentRecords();
  }

  public retrieveAllPaymentRecords(): void {
    this.isFetching = true;

    this.paymentRecordService()
      .retrieve()
      .then(
        res => {
          this.paymentRecords = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPaymentRecord): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePaymentRecord(): void {
    this.paymentRecordService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A PaymentRecord is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllPaymentRecords();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
