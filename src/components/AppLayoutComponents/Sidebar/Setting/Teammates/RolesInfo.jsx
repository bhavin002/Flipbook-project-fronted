import { Card, CardContent} from "@/components/ui/card";

export default function RolesInfo() {
    return (
         <Card>
            <CardContent className="space-y-4 pt-6">
                <div>
                    <p className='text-sm font-semibold'>
                        Owner
                    </p>
                    <p className='text-xs'>
                        Person who created the account. Has ultimate control over the account.
                    </p>
                </div>
                <div>
                    <p className='text-sm font-semibold'>
                        Administrator
                    </p>
                    <p className='text-xs'>
                        Has the same access as the owner, but there can be multiple administrators.
                    </p>
                </div>
                <div>
                    <p className='text-sm font-semibold'>
                        Editor
                    </p>
                    <p className='text-xs'>
                        Has full flipbook editing permissions. Does not have access to Billing and Settings.
                    </p>
                </div>
                <div>
                    <p className='text-sm font-semibold'>
                        Agent
                    </p>
                    <p className='text-xs'>
                        Has access to their own flipbooks. Does not have access to Billing and Settings.
                    </p>
                </div>
                {/* <div>
                    <p className='text-sm font-semibold'>
                        Contributor
                    </p>
                    <p className='text-xs'>
                        Can create, edit and view their own flipbooks, but they can only be published by the Owner, Administrators or Editors.
                    </p>
                </div> */}
            </CardContent>
        </Card>
    )
}