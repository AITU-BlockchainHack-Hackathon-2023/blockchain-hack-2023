package v1

type Api struct {
}

func New() (*Api, error) {
	return &Api{}, nil
}

func (a Api) Register() error {
	return nil
}
