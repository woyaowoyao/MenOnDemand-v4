/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TrainingDetailComponent from '@/entities/training/training-details.vue';
import TrainingClass from '@/entities/training/training-details.component';
import TrainingService from '@/entities/training/training.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Training Management Detail Component', () => {
    let wrapper: Wrapper<TrainingClass>;
    let comp: TrainingClass;
    let trainingServiceStub: SinonStubbedInstance<TrainingService>;

    beforeEach(() => {
      trainingServiceStub = sinon.createStubInstance<TrainingService>(TrainingService);

      wrapper = shallowMount<TrainingClass>(TrainingDetailComponent, {
        store,
        localVue,
        provide: { trainingService: () => trainingServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTraining = { id: 123 };
        trainingServiceStub.find.resolves(foundTraining);

        // WHEN
        comp.retrieveTraining(123);
        await comp.$nextTick();

        // THEN
        expect(comp.training).toBe(foundTraining);
      });
    });
  });
});
