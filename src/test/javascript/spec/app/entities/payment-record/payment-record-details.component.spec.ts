/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PaymentRecordDetailComponent from '@/entities/payment-record/payment-record-details.vue';
import PaymentRecordClass from '@/entities/payment-record/payment-record-details.component';
import PaymentRecordService from '@/entities/payment-record/payment-record.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('PaymentRecord Management Detail Component', () => {
    let wrapper: Wrapper<PaymentRecordClass>;
    let comp: PaymentRecordClass;
    let paymentRecordServiceStub: SinonStubbedInstance<PaymentRecordService>;

    beforeEach(() => {
      paymentRecordServiceStub = sinon.createStubInstance<PaymentRecordService>(PaymentRecordService);

      wrapper = shallowMount<PaymentRecordClass>(PaymentRecordDetailComponent, {
        store,
        localVue,
        provide: { paymentRecordService: () => paymentRecordServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPaymentRecord = { id: 123 };
        paymentRecordServiceStub.find.resolves(foundPaymentRecord);

        // WHEN
        comp.retrievePaymentRecord(123);
        await comp.$nextTick();

        // THEN
        expect(comp.paymentRecord).toBe(foundPaymentRecord);
      });
    });
  });
});
