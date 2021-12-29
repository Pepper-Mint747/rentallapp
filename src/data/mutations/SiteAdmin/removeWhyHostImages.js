import WhyHostBlockType from '../../types/WhyHostBlockType';
import { WhyHostInfoBlock } from '../../models'

import {
    GraphQLString as StringType
} from 'graphql';

const removeWhyHostImages = {

    type: WhyHostBlockType,

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, {
        name
    }) {

        if (request.user && request.user.admin == true) {
            let isWhyHostBlockUpdated = false;
            
                const updatehostBannerImage1 = await WhyHostInfoBlock.update(
                    { value: null }, 
                    { where: { name: name } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });

            if (isWhyHostBlockUpdated) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }


        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default removeWhyHostImages;

/*

mutation (
    $hostBannerTitle1: String,
    $hostBannerImage1: String,
    $whyBlockTitle1: String,
    $whyBlockContent1: String,
    $whyBlockTitle2: String,
    $whyBlockContent2: String,
    $hostingBlockTitleHeading: String,
    $hostingBlockTitle1: String,
    $hostingBlockTitle2: String,
    $hostingBlockTitle3: String,
    $hostingBlockContent1: String,
    $hostingBlockContent2: String,
    $hostingBlockContent3: String,
    $coverSectionTitle1: String,
    $coverSectionContent1: String,
    $coverSectionContent2: String,
    $coverSectionImage1: String,
    $coverSectionFeature1: String,
    $coverSectionFeature2: String,
    $coverSectionFeature3: String,
    $coverSectionFeature4: String,
    $coverSectionFeature5: String,
    $coverSectionFeature6: String,
    $paymentTitleHeading: String,
    $paymentTitle1: String,
    $paymentTitle2: String,
    $paymentTitle3: String,
    $paymentContent1: String,
    $paymentContent2: String,
    $paymentContent3: String,
    $quoteSectionTitle1: String,
    $quoteSectionContent1: String,
    $quoteSectionTitle2: String,
    $quoteSectionContent2: String,
    $quoteSectionImage1: String,
    $quoteSectionImage2: String,
    $quoteSectionButton1: String,
    $quoteSectionButton2: String
) {
  updateWhyHostPage (
    hostBannerTitle1: $hostBannerTitle1,
    hostBannerImage1: $hostBannerImage1,
    whyBlockTitle1: $whyBlockTitle1,
    whyBlockContent1: $whyBlockContent1,
    whyBlockTitle2: $whyBlockTitle2,
    whyBlockContent2: $whyBlockContent2,
    hostingBlockTitleHeading: $hostingBlockTitleHeading,
    hostingBlockTitle1: $hostingBlockTitle1,
    hostingBlockTitle2: $hostingBlockTitle2,
    hostingBlockTitle3: $hostingBlockTitle3,
    hostingBlockContent1: $hostingBlockContent1,
    hostingBlockContent2: $hostingBlockContent2,
    hostingBlockContent3: $hostingBlockContent3,
    coverSectionTitle1: $coverSectionTitle1,
    coverSectionContent1: $coverSectionContent1,
    coverSectionContent2: $coverSectionContent2,
    coverSectionImage1: $coverSectionImage1,
    coverSectionFeature1: $coverSectionFeature1,
    coverSectionFeature2: $coverSectionFeature2,
    coverSectionFeature3: $coverSectionFeature3,
    coverSectionFeature4: $coverSectionFeature4,
    coverSectionFeature5: $coverSectionFeature5,
    coverSectionFeature6: $coverSectionFeature6,
    paymentTitleHeading: $paymentTitleHeading,
    paymentTitle1: $paymentTitle1,
    paymentTitle2: $paymentTitle2,
    paymentTitle3: $paymentTitle3,
    paymentContent1: $paymentContent1,
    paymentContent2: $paymentContent2,
    paymentContent3: $paymentContent3,
    quoteSectionTitle1: $quoteSectionTitle1,
    quoteSectionContent1: $quoteSectionContent1,
    quoteSectionTitle2: $quoteSectionTitle2,
    quoteSectionContent2: $quoteSectionContent2,
    quoteSectionImage1: $quoteSectionImage1,
    quoteSectionImage2: $quoteSectionImage2,
    quoteSectionButton1: $quoteSectionButton1,
    quoteSectionButton2: $quoteSectionButton2
  ) {
      status
  }
}

*/