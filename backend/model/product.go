package model

type Product struct {
	ProductID               string  `json:"productId"`
	CategoryID              string  `json:"categoryId"`
	ProductCode             string  `json:"productCode"`
	ProductName             string  `json:"productName"`
	ProductKana             *string `json:"productKana"`
	TaxDivision             string  `json:"taxDivision"`
	ProductPriceDivision    string  `json:"productPriceDivision"`
	Price                   string  `json:"price"`
	CustomerPrice           *string `json:"customerPrice"`
	Cost                    *string `json:"cost"`
	Attribute               *string `json:"attribute"`
	Description             *string `json:"description"`
	CatchCopy               *string `json:"catchCopy"`
	Size                    *string `json:"size"`
	Color                   *string `json:"color"`
	Tag                     *string `json:"tag"`
	GroupCode               *string `json:"groupCode"`
	URL                     *string `json:"url"`
	PrintReceiptProductName *string `json:"printReceiptProductName"`
	DisplaySequence         *int    `json:"displaySequence"`
	SalesDivision           string  `json:"salesDivision"`
	StockControlDivision    string  `json:"stockControlDivision"`
	DisplayFlag             string  `json:"displayFlag"`
	Division                string  `json:"division"`
	ProductOptionGroupID    *string `json:"productOptionGroupId"`
	PointNotApplicable      string  `json:"pointNotApplicable"`
	TaxFreeDivision         string  `json:"taxFreeDivision"`
	SupplierProductNo       *string `json:"supplierProductNo"`
	CalcDiscount            string  `json:"calcDiscount"`
	StaffDiscountRate       *string `json:"staffDiscountRate"`
	UseCategoryReduceTax    string  `json:"useCategoryReduceTax"`
	ReduceTaxID             *string `json:"reduceTaxId"`
	ReduceTaxPrice          *string `json:"reduceTaxPrice"`
	ReduceTaxCustomerPrice  *string `json:"reduceTaxCustomerPrice"`
	OrderPoint              *string `json:"orderPoint"`
	PurchaseCost            *string `json:"purchaseCost"`
	AppStartDateTime        *string `json:"appStartDateTime"`
	InsDateTime             string  `json:"insDateTime"`
	UpdDateTime             string  `json:"updDateTime"`
}

type OutputProduct struct {
	ID         string `json:"productId"`
	Name       string `json:"productName"`
	Price      string `json:"price"`
	CategoryID string `json:"categoryId"`
}
