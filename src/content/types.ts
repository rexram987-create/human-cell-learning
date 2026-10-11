export type Lesson={id:string;categoryId:string;title:string;englishTitle:string;summary:string;simple:string[];deeper:string[];imageIds:string[];sourceIds:string[];verifiedAt:string;relatedIds:string[];role:string;group?:string;steps?:{title:string;description:string}[]};
export type Source={id:string;title:string;url:string;checkedAt:string;revisionUrl?:string;kind:string};
export type Asset={id:string;path:string;creator:string;sourceUrl:string;license:string;licenseUrl:string;changes:string;alt:string};
export type Category={id:string;title:string;description:string;icon:string;color:string};
export type GlossaryTerm={id:string;term:string;definition:string;lessonId:string};
