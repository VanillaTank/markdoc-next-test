import { AppLink } from '../../components/AppLink';

export const link = {
  render: AppLink,
  attributes: {
    href: { type: String },
    title: { type: String }
  },
};
