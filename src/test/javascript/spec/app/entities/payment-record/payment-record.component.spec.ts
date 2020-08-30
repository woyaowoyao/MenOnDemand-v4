/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PaymentRecordComponent from '@/entities/payment-record/payment-record.vue';
import PaymentRecordClass from '@/entities/payment-record/payment-record.component';
import PaymentRecordService from '@/entities/payment-record/payment-record.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('PaymentRecord Management Component', () => {
    let wrapper: Wrapper<PaymentRecordClass>;
    let comp: PaymentRecordClass;
    let paymentRecordServiceStub: SinonStubbedInstance<PaymentRecordService>;

    beforeEach(() => {
      paymentRecordServiceStub = sinon.createStubInstance<PaymentRecordService>(PaymentRecordService);
      paymentRecordServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PaymentRecordClass>(PaymentRecordComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          paymentRecordService: () => paymentRecordServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      paymentRecordServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPaymentRecords();
      await comp.$nextTick();

      // THEN
      expect(paymentRecordServiceStub.retrieve.called).toBeTruthy();
      expect(comp.paymentRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      paymentRecordServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePaymentRecord();
      await comp.$nextTick();

      // THEN
      expect(paymentRecordServiceStub.delete.called).toBeTruthy();
      expect(paymentRecordServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
