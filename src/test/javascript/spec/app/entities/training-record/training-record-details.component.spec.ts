/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TrainingRecordDetailComponent from '@/entities/training-record/training-record-details.vue';
import TrainingRecordClass from '@/entities/training-record/training-record-details.component';
import TrainingRecordService from '@/entities/training-record/training-record.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TrainingRecord Management Detail Component', () => {
    let wrapper: Wrapper<TrainingRecordClass>;
    let comp: TrainingRecordClass;
    let trainingRecordServiceStub: SinonStubbedInstance<TrainingRecordService>;

    beforeEach(() => {
      trainingRecordServiceStub = sinon.createStubInstance<TrainingRecordService>(TrainingRecordService);

      wrapper = shallowMount<TrainingRecordClass>(TrainingRecordDetailComponent, {
        store,
        localVue,
        provide: { trainingRecordService: () => trainingRecordServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTrainingRecord = { id: 123 };
        trainingRecordServiceStub.find.resolves(foundTrainingRecord);

        // WHEN
        comp.retrieveTrainingRecord(123);
        await comp.$nextTick();

        // THEN
        expect(comp.trainingRecord).toBe(foundTrainingRecord);
      });
    });
  });
});
