import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,

  } from 'graphql';
  
  const SideMenuType = new ObjectType({
    name: 'SideMenu',
    fields: {
      blockTitle1: { type: StringType },
      blockContent1: { type: StringType },
      blockTitle2: { type: StringType },
      blockContent2: { type: StringType },
      blockTitle3: { type: StringType },
      blockContent3: { type: StringType },
      status: {
        type: StringType
      },
      title: { type: StringType },
      description: { type: StringType },
      name: { type: StringType },
      step: { type: IntType },
      page: { type: StringType },
      isEnable: { type: BooleanType },
    },
  });
  
  export default SideMenuType;
  