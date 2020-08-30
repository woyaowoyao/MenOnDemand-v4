/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TrainingRecordUpdateComponent from '@/entities/training-record/training-record-update.vue';
import TrainingRecordClass from '@/entities/training-record/training-record-update.component';
import TrainingRecordService from '@/entities/training-record/training-record.service';

import UserService from '@/admin/user-management/user-management.service';

import TrainingService from '@/entities/training/training.service';

import TechnologyService from '@/entities/technology/technology.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('TrainingRecord Management Update Component', () => {
    let wrapper: Wrapper<TrainingRecordClass>;
    let comp: TrainingRecordClass;
    let trainingRecordServiceStub: SinonStubbedInstance<TrainingRecordService>;

    beforeEach(() => {
      trainingRecordServiceStub = sinon.createStubInstance<TrainingRecordService>(TrainingRecordService);

      wrapper = shallowMount<TrainingRecordClass>(TrainingRecordUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          trainingRecordService: () => trainingRecordServiceStub,

          userService: () => new UserService(),

          trainingService: () => new TrainingService(),

          technologyService: () => new TechnologyService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.trainingRecord = entity;
        trainingRecordServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(trainingRecordServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.trainingRecord = entity;
        trainingRecordServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(trainingRecordServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
