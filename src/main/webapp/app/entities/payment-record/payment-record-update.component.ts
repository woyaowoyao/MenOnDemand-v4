import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IPaymentRecord, PaymentRecord } from '@/shared/model/payment-record.model';
import PaymentRecordService from './payment-record.service';

const validations: any = {
  paymentRecord: {
    txnType: {
      required,
    },
    amount: {
      required,
      numeric,
    },
    totalAmountToMentor: {
      required,
      numeric,
    },
    issuedTime: {
      required,
    },
    remarks: {},
  },
};

@Component({
  validations,
})
export default class PaymentRecordUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('paymentRecordService') private paymentRecordService: () => PaymentRecordService;
  public paymentRecord: IPaymentRecord = new PaymentRecord();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.paymentRecordId) {
        vm.retrievePaymentRecord(to.params.paymentRecordId);
      }
      vm.initRelationships();
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
    if (this.paymentRecord.id) {
      this.paymentRecordService()
        .update(this.paymentRecord)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A PaymentRecord is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.paymentRecordService()
        .create(this.paymentRecord)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A PaymentRecord is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.paymentRecord[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.paymentRecord[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.paymentRecord[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.paymentRecord[field] = null;
    }
  }

  public retrievePaymentRecord(paymentRecordId): void {
    this.paymentRecordService()
      .find(paymentRecordId)
      .then(res => {
        res.issuedTime = new Date(res.issuedTime);
        this.paymentRecord = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
