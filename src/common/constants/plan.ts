interface optionplan {
  limit: number;
}

interface ITrackingPlan {
  pro: optionplan;
  basic: optionplan;
  enterprise: optionplan;
  unlimited: boolean;
}

export const TrackingPlan: ITrackingPlan = {
  pro: {
    limit: 15000,
  },
  basic: {
    limit: 5000,
  },
  enterprise: {
    limit: 30000,
  },
  unlimited: true,
};
