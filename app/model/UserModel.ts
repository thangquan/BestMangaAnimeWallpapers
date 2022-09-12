export default class UserModel {
    id?: String
    uid: String = ''
    accessToken: String = ''
    name: String = ''

    constructor(dict: any) {
        if (dict === undefined || dict === null) {
            return
        }
        this.id = dict?.id ?? ''
        this.uid = dict?.uid ?? ''
        this.accessToken = dict?.accessToken ?? ''
        this.name = dict?.fullname ?? ''
    }
}
