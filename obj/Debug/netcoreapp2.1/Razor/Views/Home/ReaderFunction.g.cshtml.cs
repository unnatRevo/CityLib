#pragma checksum "/home/unnat/Projects/LibMgt/CityLib/Views/Home/ReaderFunction.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7116959dd23d365fb88c17af1b7892e0b3a74875"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_ReaderFunction), @"mvc.1.0.view", @"/Views/Home/ReaderFunction.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/ReaderFunction.cshtml", typeof(AspNetCore.Views_Home_ReaderFunction))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "/home/unnat/Projects/LibMgt/CityLib/Views/_ViewImports.cshtml"
using CityLib;

#line default
#line hidden
#line 2 "/home/unnat/Projects/LibMgt/CityLib/Views/_ViewImports.cshtml"
using CityLib.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7116959dd23d365fb88c17af1b7892e0b3a74875", @"/Views/Home/ReaderFunction.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"63d94de26a8438ac102887bd0b36e1da8cc0cf9c", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_ReaderFunction : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 1 "/home/unnat/Projects/LibMgt/CityLib/Views/Home/ReaderFunction.cshtml"
  
    ViewData["Title"] = "Reader Function";

#line default
#line hidden
            BeginContext(48, 4, true);
            WriteLiteral("<h2>");
            EndContext();
            BeginContext(53, 17, false);
#line 4 "/home/unnat/Projects/LibMgt/CityLib/Views/Home/ReaderFunction.cshtml"
Write(ViewData["Title"]);

#line default
#line hidden
            EndContext();
            BeginContext(70, 66, true);
            WriteLiteral("</h2>\n\n<p>\n    This is Reader Function and its working fine.\n</p>\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
