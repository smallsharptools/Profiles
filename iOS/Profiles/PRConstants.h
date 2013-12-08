//
//  PRConstants.h
//  Profiles
//
//  Created by Brennan Stehling on 12/8/13.
//  Copyright (c) 2013 Profiles. All rights reserved.
//

#ifndef Profiles_PRConstants_h
#define Profiles_PRConstants_h

#ifdef DEVELOPMENT

#define     kBaseURLScheme              @"profilesdevapp://"

#define     kTestFlightToken            @"CHANGE"

#define     kParseApplicationId         @"CHANGE"
#define     kParseAppClientKey          @"CHANGE"

#define     kLinkedInAPIKey             @"CHANGE"
#define     kLinkedInSecretKey          @"CHANGE"
#define     kLinkedInOAuthUserToken     @"CHANGE"
#define     kLinkedInOAuthUserSecret    @"CHANGE"

#else

#define     kBaseURLScheme          @"profilesapp://"

#define     kTestFlightToken        @"CHANGE"

#define     kParseApplicationId     @"CHANGE"
#define     kParseAppClientKey      @"CHANGE"

#define     kLinkedInAPIKey             @"CHANGE"
#define     kLinkedInSecretKey          @"CHANGE"
#define     kLinkedInOAuthUserToken     @"CHANGE"
#define     kLinkedInOAuthUserSecret    @"CHANGE"

#endif

#endif
