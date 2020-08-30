import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Mentor = () => import('@/entities/mentor/mentor.vue');
// prettier-ignore
const MentorUpdate = () => import('@/entities/mentor/mentor-update.vue');
// prettier-ignore
const MentorDetails = () => import('@/entities/mentor/mentor-details.vue');
// prettier-ignore
const MentorSkill = () => import('@/entities/mentor-skill/mentor-skill.vue');
// prettier-ignore
const MentorSkillUpdate = () => import('@/entities/mentor-skill/mentor-skill-update.vue');
// prettier-ignore
const MentorSkillDetails = () => import('@/entities/mentor-skill/mentor-skill-details.vue');
// prettier-ignore
const MyCalendar = () => import('@/entities/my-calendar/my-calendar.vue');
// prettier-ignore
const MyCalendarUpdate = () => import('@/entities/my-calendar/my-calendar-update.vue');
// prettier-ignore
const MyCalendarDetails = () => import('@/entities/my-calendar/my-calendar-details.vue');
// prettier-ignore
const Training = () => import('@/entities/training/training.vue');
// prettier-ignore
const TrainingUpdate = () => import('@/entities/training/training-update.vue');
// prettier-ignore
const TrainingDetails = () => import('@/entities/training/training-details.vue');
// prettier-ignore
const TrainingRecord = () => import('@/entities/training-record/training-record.vue');
// prettier-ignore
const TrainingRecordUpdate = () => import('@/entities/training-record/training-record-update.vue');
// prettier-ignore
const TrainingRecordDetails = () => import('@/entities/training-record/training-record-details.vue');
// prettier-ignore
const PaymentRecord = () => import('@/entities/payment-record/payment-record.vue');
// prettier-ignore
const PaymentRecordUpdate = () => import('@/entities/payment-record/payment-record-update.vue');
// prettier-ignore
const PaymentRecordDetails = () => import('@/entities/payment-record/payment-record-details.vue');
// prettier-ignore
const Technology = () => import('@/entities/technology/technology.vue');
// prettier-ignore
const TechnologyUpdate = () => import('@/entities/technology/technology-update.vue');
// prettier-ignore
const TechnologyDetails = () => import('@/entities/technology/technology-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/mentor',
    name: 'Mentor',
    component: Mentor,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor/new',
    name: 'MentorCreate',
    component: MentorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor/:mentorId/edit',
    name: 'MentorEdit',
    component: MentorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor/:mentorId/view',
    name: 'MentorView',
    component: MentorDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor-skill',
    name: 'MentorSkill',
    component: MentorSkill,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor-skill/new',
    name: 'MentorSkillCreate',
    component: MentorSkillUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor-skill/:mentorSkillId/edit',
    name: 'MentorSkillEdit',
    component: MentorSkillUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/mentor-skill/:mentorSkillId/view',
    name: 'MentorSkillView',
    component: MentorSkillDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/my-calendar',
    name: 'MyCalendar',
    component: MyCalendar,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/my-calendar/new',
    name: 'MyCalendarCreate',
    component: MyCalendarUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/my-calendar/:myCalendarId/edit',
    name: 'MyCalendarEdit',
    component: MyCalendarUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/my-calendar/:myCalendarId/view',
    name: 'MyCalendarView',
    component: MyCalendarDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training',
    name: 'Training',
    component: Training,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training/new',
    name: 'TrainingCreate',
    component: TrainingUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training/:trainingId/edit',
    name: 'TrainingEdit',
    component: TrainingUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training/:trainingId/view',
    name: 'TrainingView',
    component: TrainingDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training-record',
    name: 'TrainingRecord',
    component: TrainingRecord,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training-record/new',
    name: 'TrainingRecordCreate',
    component: TrainingRecordUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training-record/:trainingRecordId/edit',
    name: 'TrainingRecordEdit',
    component: TrainingRecordUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/training-record/:trainingRecordId/view',
    name: 'TrainingRecordView',
    component: TrainingRecordDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment-record',
    name: 'PaymentRecord',
    component: PaymentRecord,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment-record/new',
    name: 'PaymentRecordCreate',
    component: PaymentRecordUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment-record/:paymentRecordId/edit',
    name: 'PaymentRecordEdit',
    component: PaymentRecordUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/payment-record/:paymentRecordId/view',
    name: 'PaymentRecordView',
    component: PaymentRecordDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/technology',
    name: 'Technology',
    component: Technology,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/technology/new',
    name: 'TechnologyCreate',
    component: TechnologyUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/technology/:technologyId/edit',
    name: 'TechnologyEdit',
    component: TechnologyUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/technology/:technologyId/view',
    name: 'TechnologyView',
    component: TechnologyDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
