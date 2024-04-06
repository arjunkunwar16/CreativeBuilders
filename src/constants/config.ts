type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: 'Creative Builders — Where Ideas Construct Themselves',
    fullName: 'AI Arch',
    email: '@',
  },
  hero: {
    name: 'Creative Builders',
    p: ['Where Ideas Constructs Itself'],
  },
  contact: {
    p: 'Wanna be a Creative Builder ?',
    h2: 'Register.',
    form: {
      name: {
        span: 'Your Name',
        placeholder: "What's your name?",
      },
      email: { span: 'Your Email', placeholder: "What's your email?" },
      message: {
        span: 'Your Message',
        placeholder: 'What do you want to say?',
      },
    },
  },
  sections: {
    about: {
      p: '',
      h2: 'Overview.',
      content: `
       `,
    },
    experience: {
      p: 'Solution ',
      h2: 'Having Queries?',
    },
    feedbacks: {
      p: 'What others say',
      h2: 'Testimonials.',
    },
    works: {
      p: 'Introducing',
      h2: 'NFT MARKETPLACE',
      content: `Our NFT marketplace is designed for simplicity. 
      Easily list your stunning 3D architectural models for sale
       and reach a global audience of buyers and enthusiasts. Secure
        transactions and streamlined processes make your NFT experience seamless.`,
    },
  },
};
