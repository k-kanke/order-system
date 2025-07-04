package model

type Category struct {
	CategoryID         string  `json:"categoryId"`
	CategoryCode       string  `json:"categoryCode"`
	CategoryName       string  `json:"categoryName"`
	CategoryAbbr       string  `json:"categoryAbbr"`
	DisplaySequence    *int    `json:"displaySequence"`
	DisplayFlag        string  `json:"displayFlag"`
	TaxDivision        *string `json:"taxDivision"`
	PointNotApplicable string  `json:"pointNotApplicable"`
	TaxFreeDivision    string  `json:"taxFreeDivision"`
	ReduceTaxID        *string `json:"reduceTaxId"`
	Color              *string `json:"color"`
	CategoryGroupID    *string `json:"categoryGroupId"`
	ParentCategoryID   string  `json:"parentCategoryId"`
	Level              string  `json:"level"`
	Tag                *string `json:"tag"`
	InsDateTime        string  `json:"insDateTime"`
	UpdDateTime        string  `json:"updDateTime"`
}

type OutputCategory struct {
	ID       string            `json:"id"`
	Name     string            `json:"name"`
	Code     string            `json:"code"`
	Children []*OutputCategory `json:"children,omitempty"`
	Products []OutputProduct   `json:"products,omitempty"`
}
