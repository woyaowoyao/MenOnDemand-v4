import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPaymentRecord } from '@/shared/model/payment-record.model';
import PaymentRecordService from './payment-record.service';

@Component
export default class PaymentRecordDetails extends Vue {
  @Inject('paymentRecordService') private paymentRecordService: () => PaymentRecordService;
  public paymentRecord: IPaymentRecord = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.paymentRecordId) {
        vm.retrievePaymentRecord(to.params.paymentRecordId);
      }
    });
  }

  public retrievePaymentRecord(paymentRecordId) {
    this.paymentRecordService()
      .find(paymentRecordId)
      .then(res => {
        this.paymentRecord = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
