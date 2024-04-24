import { thousandUnit } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const IconList: React.FC<{
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
}> = ({ data }) => {
  const renderView = () => (
    <div className="flex items-center mr-[0.625rem]">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 0.56 0.56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M0.355 0.308c0.005 -0.011 0.007 -0.023 0.007 -0.028 0 -0.047 -0.036 -0.085 -0.081 -0.085s-0.081 0.038 -0.081 0.085 0.041 0.078 0.081 0.078c0.026 0 0.049 -0.013 0.064 -0.033a0.086 0.086 0 0 0 0.01 -0.017m-0.074 0.007c0.01 0 0.019 -0.004 0.027 -0.01 0.009 -0.008 0.012 -0.019 0.012 -0.025 0 -0.023 -0.017 -0.043 -0.039 -0.043S0.24 0.257 0.24 0.28c0 0.016 0.018 0.035 0.041 0.035"
          fill="rgba(205, 207, 208, 1)"
          fill-rule="evenodd"
        />
        <path
          clip-rule="evenodd"
          d="M0.022 0.285a0.009 0.009 0 0 1 0 -0.011q0 0 0.001 -0.001C0.096 0.167 0.186 0.11 0.28 0.11c0.094 0 0.184 0.057 0.258 0.163 0.001 0.002 0.002 0.004 0.002 0.007 0 0.003 -0.001 0.005 -0.002 0.007C0.465 0.393 0.374 0.45 0.28 0.45c-0.094 0 -0.185 -0.057 -0.258 -0.165m0.057 -0.018a0.021 0.021 0 0 0 0 0.026c0.063 0.078 0.133 0.115 0.201 0.115s0.139 -0.037 0.201 -0.115a0.021 0.021 0 0 0 0 -0.026c-0.063 -0.078 -0.133 -0.115 -0.201 -0.115s-0.139 0.037 -0.201 0.115"
          fill="rgba(205, 207, 208, 1)"
          fill-rule="evenodd"
        />
      </svg>
      <div className="ml-[0.3125rem] text-[0.75rem]">
        {thousandUnit(data.views)}
      </div>
    </div>
  );

  const renderComment = () => (
    <div className="flex items-center mr-[0.625rem]">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 0.48 0.48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.14 0.14h0.16"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.04"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.14 0.22h0.08"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.04"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.38 0.06H0.1a0.04 0.04 0 0 0 -0.04 0.04v0.2a0.04 0.04 0 0 0 0.04 0.04h0.06l0.073 0.073a0.01 0.01 0 0 0 0.014 0L0.32 0.34h0.06a0.04 0.04 0 0 0 0.04 -0.04V0.1a0.04 0.04 0 0 0 -0.04 -0.04"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.04"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="ml-[0.3125rem] text-[0.75rem]">
        {thousandUnit(data.children.length)}
      </div>
    </div>
  );
  const renderLike = () => (
    <div className="flex items-center mr-[0.625rem]">
      <svg
        fill="rgba(205, 207, 208, 1)"
        width="16px"
        height="16px"
        viewBox="0 0 0.7 0.7"
        data-name="Layer 2"
        id="a7daf31a-416c-477a-878c-91e621672bd4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.35 0.665a0.026 0.026 0 0 1 -0.012 -0.003C-0.014 0.475 0.003 0.244 0.006 0.218a0.184 0.184 0 0 1 0.344 -0.091 0.185 0.185 0 0 1 0.344 0.092c0.004 0.034 0.013 0.259 -0.332 0.443a0.025 0.025 0 0 1 -0.012 0.003M0.191 0.085a0.135 0.135 0 0 0 -0.135 0.135 0.026 0.026 0 0 1 0 0.004c-0.001 0.009 -0.026 0.213 0.294 0.388 0.317 -0.174 0.295 -0.379 0.294 -0.388a0.02 0.02 0 0 1 0 -0.003v-0.001a0.135 0.135 0 0 0 -0.269 0.001 0.025 0.025 0 0 1 -0.05 0 0.135 0.135 0 0 0 -0.134 -0.135" />
      </svg>
      <div className="ml-[0.3125rem] text-[0.75rem]">
        {thousandUnit(data.likes.length)}
      </div>
    </div>
  );
  const renderShare = () => (
    <div className="flex items-center">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 0.96 0.96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          width="48"
          height="48"
          fill="white"
          fill-opacity="0.01"
          d="M0 0H0.96V0.96H0V0z"
        />
        <path
          d="M0.52 0.12h0.32v0.32"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.08"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.84 0.589V0.78a0.06 0.06 0 0 1 -0.06 0.06H0.18a0.06 0.06 0 0 1 -0.06 -0.06V0.18a0.06 0.06 0 0 1 0.06 -0.06h0.18"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.08"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.516 0.444 0.822 0.138"
          stroke="rgba(205, 207, 208, 1)"
          stroke-width="0.08"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="ml-[0.3125rem] text-[0.75rem]">
        {thousandUnit(data.reposts)}
      </div>
    </div>
  );
  return (
    <div className="flex">
      {renderView()}
      {renderComment()}
      {renderLike()}
      {renderShare()}
    </div>
  );
};
