// PS3 Init Variables
// PS3Xploit Team 2018 / ps3xploit.com


var n =  new Date();
var y = n.getFullYear();
var m = ("0" + (n.getMonth() + 1)).slice(-2);
var d = ("0" + n.getDate()).slice(-2);

var br="<br>";
var hr="<hr>";

var cookie_get;
var cookie_set;

// Supported Firmware Versions
var fwCompat = ["4.00","4.10","4.11","4.20","4.21","4.25","4.30","4.31","4.40","4.41","4.45","4.46","4.50","4.53","4.55","4.60","4.65","4.66","4.70","4.75","4.76","4.78","4.80","4.81","4.82"];
var vshType="";

// Offsets and Compatibility
var isPlaystation = false;
var disableFeatures = false;
var ua = navigator.userAgent;
var uaStringCheck = ua.substring(ua.indexOf("5.0 (") + 5, ua.indexOf(") Apple") - 7);
var fwVersion = ua.substring(ua.indexOf("5.0 (") + 19, ua.indexOf(") Apple"));

// Set Offset Defaults
var g_toc;
var g_1;// leftover webkit code
var g_2;// initial stack control
var g_set_r4_thru_r11;// set r4-r11 + r29-r31
var g_set_r3_from_r29;// set r3 from r29
var g_set_r3_with_ld;
var g_set_r3_and_clear;
var g_set_r3_and_sc;
var g_set_r5_from_r29;
var g_set_r20_thru_r31;
var g_set_r31_from_r23;
var g_set_r31_E8;
var g_set_r31_F8;
var g_store_r3_into_r31;
var g_sc_80;// sc then load r0 from r1+0x80
var g_sc_90;// sc then load r0 from r1+0x90
var g_sc_A0;// sc then load r0 from r1+0xA0
var g_sc_set_r3_from_r9;// set r3 from r9 and sc
var g_sc_set_r3_from_r10;// set r3 from r10 and sc
var g_fsopen_write_close;
var g_cellfs_open_write_close1;
var g_mount_flash;
var g_unk_user_id1;
var g_unk_user_id2;
var g_unk_registry1;
var g_unk_registry_backup;
var g_unk_registry_restore;
var g_unk_explore_plugin_bin;
var g_unk_psp_rif;
var g_unk_login_xmb;
var g_xmb_restore;
var g_unk_pkg1;
var g_unk_sync;
var g_unk_bg_download1;
var g_unk_bg_download2;
var g_unk_post_update1;
var g_unk_post_update2;
var g_unk_crash_report1;
var g_unk_http_client;
var g_unk_fsck;
var g_unk_debug1;
var g_tty_write;
var g_unk_act_dat1;
var g_unk_act_dat2;
var g_unk_rif1;
var g_unk_rif2;
var g_unk_rif3;
var g_unk_exdata_edat1;
var g_unk_thread1;
var g_unk_prx1;
var g_unk_mount_bdvd;
var g_unk_mount_fat;
var g_unk_display_res1;
var g_unk_display_res2;
var g_unk_game_res;
var g_unk_alpha_numeric;
var g_unk_update_game_data;

// Exits
var g_init_reboot;
var g_init_shutdown;
var g_exit_chain;// graceful exit
var g_init_shutdown;// init beep and shutdown

// Subs
var s_cellfs_write;
var s_create_new_user;
var s_mount_hdd1;
var s_ps_button_bp;
var s_remove_act_dat;
var s_remove_exdata;
var s_start_busy_icon;
var s_unk_create_new_user2;
var s_unk_create_new_user3;
var s_unk_flash2_post_update;
var s_unk_game_exec;
var s_unk_game_debug_pafjob;
var s_unk_manager_signout;
var s_unk_mount_hdd;
var s_unk_network_printf;
var s_unk_psx_ps2;
var s_unk_premo_plugin;
var s_unk_upload_util;

// Exports
var e_cellfs_closedir;
var e_cellfs_opendir;
var e_cellfs_readdir;
var e_fopen_write_close;
var e_stdc_opendir;
var e_stdc_readdir;
var e_unk_game_plugin;
var e_unk_vsh_printf;
var e_unk_xmb_plugin;


var debug_mode=false;// log debug to screen
var disable_trigger=false;// used for testing with alert

var page_args_set=false;
var disable_reboot=true;

// Auto-Reload Page Flag
var auto_reload=false;

// Memory Searching
var t_out=0;
var total_loops=0;
var max_loops=40;
var failCount=0;
var failCountMax=1;
var search_max_threshold = 70*0x100000;
var search_max_threshold_backup = 70*0x100000;
var search_base_offset = 0x80200000;// 0x80190000
var search_base_offset_min = 0x80200000;
var search_base_offset_max = search_base_offset_min+0x240000;
var search_base_offset_adjust=0x100000;
var search_base_offset_adjust_jump2=0x100000;
var search_base_offset_adjust_jump1=0x100000;
var search_range_size = 0x200000;

// store found offsets
var found_offsets=[];
var base_offsets=[];
var stack_offsets=[];
var jump2_offsets=[];
var jump1_offsets=[];

// used for dynamic search
var _addr;
		
// Default PlaceHolder
var ph=0;

// Path Address Pointers
var stackframe_bin_fp;
var usb_fp;
var usb_fp2;
var hdd_fp;
var hdd_fp2;
var path_fp;
var path_fp2;
var path_src_fp;
var path_dest_fp;
var file_mode_fp;

// File Descriptor
var usb_fd;
var usb_fd2;
var hdd_fd;
var hdd_fd2;
var fd;
var fd2;

// Used for string verification
var base;
var stk;
var j2;
var j1;
var base_found=false;
var stackframe_found=false;
var j2_found=false;
var j1_found=false;
var base_verified=false;
var stackframe_verified=false;
var j2_verified=false;
var j1_verified=false;
var allOffsetsFound=false;
var allOffsetsVerified=false;
var result_msg="";

// Required Jumps
var base_fp;
var stack_frame;
var jump_2;
var jump_1;
var verify_offsets=true;
var verify_stackframe=true;
var offsets_verified=false;// superseded

// Default Addresses
var base_fp_addr=0;
var stackframe_bin_addr=0
var usb_fp_addr=0;
var usb_fp2_addr=0;
var hdd_fp_addr=0;
var hdd_fp2_addr=0;
var path_fp_addr=0;
var path_fp2_addr=0;
var path_src_fp_addr=0;
var path_dest_fp_addr=0;
var fd_addr=0;
var fd2_addr=0;
var stack_frame_addr=0;
var jump_2_addr=0;
var jump_1_addr=0
var file_mode_fp_addr=0;
var write_bytes_addr=0;

var hdd_fp_addr_backup=0;
var usb_fp_addr_backup=0;

// Search Offset Colors
var color="#7700DA";
var colortext="#EB6C03";
var colorActive="#279947";
var colorSuccess="#FFFFFF";
var colorVerified="#EB6C03";
var colorVerifiedFake="#5B0C03";
var base_fp_color=color;
var stack_frame_color=color;
var jump_2_color=color;
var jump_1_color=color;
var base_fp_acolor=colorActive;
var stack_frame_acolor=colorActive;
var jump_2_acolor=colorActive;
var jump_1_acolor=colorActive;
var base_fp_vcolor=colorVerified;
var stack_frame_vcolor=colorVerified;
var jump_2_vcolor=colorVerified;
var jump_1_vcolor=colorVerified;

var code_cave_1=0x20900000;// 0x20900000-0x209FFFFF
var code_cave_2=0xC0900000;// 0xC0900000-0xC1C00000

var restore_stack=0x8FD8DCC0;

var isCompatCFW=false;
var isFW356=false;

var write_protect=true;

var str2u_adjusted=false;// used for str2u

var write_bytes=0x00000000;// used for db_rebuild and others
var dummy_text="Hello From PS3Xploit Team!";

// MemDump Presets
var mem_preset_0_size=0x000FFFFF;
var mem_preset_0_start=0x00000000;
var mem_preset_0_end=0x000FFFFF;
var mem_preset_1_size=0x02E2FFFF;
var mem_preset_1_start=0x00010000;
var mem_preset_1_end=0x02E3FFFF;
var mem_preset_2_size=0x0052FFFF;
var mem_preset_2_start=0x02F60000;
var mem_preset_2_end=0x0348FFFF;
var mem_preset_3_size=0x00DA146F;// 0x00DAFFFF
var mem_preset_3_start=0x03760000;
var mem_preset_3_end=0x0450FFFF;
var mem_preset_4_size=0x005EFFFF;
var mem_preset_4_start=0x04760000;
var mem_preset_4_end=0x04D4FFFF;
var mem_preset_5_size=0x0032FFFF;
var mem_preset_5_start=0x10000000;
var mem_preset_5_end=0x1032FFFF;
var mem_preset_6_size=0x0018FFFF;
var mem_preset_6_start=0x104A0000;
var mem_preset_6_end=0x1062FFFF;
var mem_preset_7_size=0x009FFFFF;
var mem_preset_7_start=0x20000000;
var mem_preset_7_end=0x209FFFFF;
var mem_preset_8_size=0x013FFFFF;
var mem_preset_8_start=0x20E00000;
var mem_preset_8_end=0x221FFFFF;
var mem_preset_9_size=0x0003FFFF;
var mem_preset_9_start=0x30000000;
var mem_preset_9_end=0x3003FFFF;
var mem_preset_10_size=0x0000FFFF;
var mem_preset_10_start=0x40000000;
var mem_preset_10_end=0x4000FFFF;
var mem_preset_11_size=0x0000FFFF;
var mem_preset_11_start=0x50000000;
var mem_preset_11_end=0x5000FFFF;
var mem_preset_12_size=0x0000FFFF;
var mem_preset_12_start=0x60000000;
var mem_preset_12_end=0x6000FFFF;
var mem_preset_13_size=0x0000FFFF;
var mem_preset_13_start=0x60100000;
var mem_preset_13_end=0x6010FFFF;
var mem_preset_14_size=0x0000FFFF;
var mem_preset_14_start=0x60200000;
var mem_preset_14_end=0x6020FFFF;
var mem_preset_15_size=0x0000FFFF;
var mem_preset_15_start=0x60300000;
var mem_preset_15_end=0x6030FFFF;
var mem_preset_16_size=0x01FFFFFF;
var mem_preset_16_start=0x70000000;
var mem_preset_16_end=0x71FFFFFF;
var mem_preset_17_size=0x7FFFFFFF;
var mem_preset_17_start=0x80000000;
var mem_preset_17_end=0x8FFFFFFF;
var mem_preset_18_size=0x0FDFFFFF;
var mem_preset_18_start=0xC0000000;
var mem_preset_18_end=0xCFDFFFFF;
var mem_preset_19_size=0x0001FFFF;
var mem_preset_19_start=0xD0010000;
var mem_preset_19_end=0xD002FFFF;
var mem_preset_20_size=0x0001FFFF;
var mem_preset_20_start=0xD0050000;
var mem_preset_20_end=0xD006FFFF;
var mem_preset_21_size=0x0002FFFF;
var mem_preset_21_start=0xD0080000;
var mem_preset_21_end=0xD00AFFFF;
var mem_preset_22_size=0x0003FFFF;
var mem_preset_22_start=0xD00C0000;
var mem_preset_22_end=0xD00FFFFF;
var mem_preset_23_size=0x0008FFFF;
var mem_preset_23_start=0xD0130000;
var mem_preset_23_end=0xD01BFFFF;


// These used in chain at diff spots
var restore_stack1=0x8FD8DCC0;
var restore_stack2=0x8FD8DCC0;
var restore_stack3=0x8FD8DCC0;
var restore_stack4=0x8FD8DCC0;
var restore_stack4a=0x8FD8DCC0;
var restore_stack5=0x8FD8DCC0;
var restore_stack6=0x8FD8DCC0;
var restore_stack7=0x8FD8DCC0;
var restore_stack8=0x8FD8DCC0;
var restore_stack9=0x8FD8DCC0;

// TESTING ONLY
//var restore_stack1=0x8FD8DCC1;
//var restore_stack2=0x8FD8DCC2;
//var restore_stack3=0x8FD8DCC3;
//var restore_stack4=0x8FD8DCC4;
//var restore_stack5=0x8FD8DCC5;
//var restore_stack6=0x8FD8DCC6;
//var restore_stack7=0x8FD8DCC7;
//var restore_stack8=0x8FD8DCC8;
//var restore_stack9=0x8FD8DCC9;

var temp_read_addr=0x89F00000;

var thread_id;

var addr_start=0x80000000;
var addr_end=0x8FFFFFFF;

// IDPS stored in memory (using DEX as default, if not match, should return all 0)
var addr_idps=0x735F98;
var out_idps="";

// PSID alternate variables
var addr_psid;
var out_psid="";

var log_div;
var msg;// generic message text placeholder
var user_id="00000001";
var user_home_path=""

var msg_override_text="";// generic message text placeholder
var msg_override_seen=false;

// Flash Types 0=NAND / 1=NOR / 2=EMMC
var type=1;
var ftype=1;
var flash_type_select=1;
var flash_type_text="NOR";

// Storage Related
var flash_type;
var st_sec;
var device_flag=0x01000000;
var nand_flag=0x00000001;
var emmc_flag=0x00000001;
var nor_flag=0x00000004;
var hdd_flag=0x00000007;
var device_id=0x00000004;
var rosdump_addr=0x8D000000;
var step_sector=0x1;
var file_size=0x00000140;
var file_size_display="0x00000140";
var file_size_input=0x00000140;
var file_size_input_addr=0x8A000100;
var useAutoSize=false;

var file_descriptor;
var path_type;
var path_src;
var path_dest;
var title_id="PS3XPLOIT";

var mount_device="CELL_FS_IOS:BUILTIN_FLSH1";
var mount_fs="CELL_FS_FAT";
var mount_path="/dev_blind";

var db_rebuild_bytes=0x000003E9;
var memdump_addr=0x80000000;
var memdump_addr_temp=0x80000000;
var memdump_addr_text="80000000";
var memdump_size=0x10000000;
var memdump_size_temp=0x10000000;
var memdump_size_text="10000000";
var memdump_end=0x8FFFFFFF;
var memdump_end_text="8FFFFFFF";

var rtn_val=0x00000000;
var rtn_val_seen=false;
var rtn_val_addr=0x8A000100;

var minver=0x00000000;
var minver_seen=false;
var minver_addr=0x89FFFFF0;

var temps_both_seen=false;

var temp_cell=0x00000000;
var temp_cell_hex=0x00000000;
var temp_cell_hexf=0x00000000;
var temp_cell_hexc=0x00000000;
var temp_cell_hex_final=0x00000000;
var temp_cell_addr=0x8C000100;

var temp_rsx=0x00000000;
var temp_rsx_hex=0x00000000;
var temp_rsx_hexf=0x00000000;
var temp_rsx_hexc=0x00000000;
var temp_rsx_hex_final=0x00000000;
var temp_rsx_addr=0x8C000110;

// Temp Addresses For Storing Values
var temp_addr;
var temp_addr_8A=0x8A000000;
var temp_addr_8B=0x8B000000;
var temp_addr_8C=0x8C000000;
var temp_addr_8D=0x8D000000;
var temp_addr_8E=0x8E000000;
var temp_addr_8F=0x8F000000;
var temp_stack_write=0x80140000;
var stackframe_storage=0x89000000;

// gadget placeholder will shut down the console
var gadget_temp=0x0C6730;

var payload_type;
var payload_hex="payload";
var payload_hex_ext="jpg";
var payload_hex_active=false;
var payload_hex_select;
var media_random="";

var padding1=0x00000000;
var padding2=0x00000000;
var padding3=0x00000000;
var padding4=0x00000000;

// Other jumps or values to set in chain
var extra1=0x80000001;
var extra2=0x80000002;
var extra3=0x80000003;
var extra4=0x80000004;
var extra5=0x80000005;
var extra6=0x80000006;
var extra7=0x80000007;
var extra8=0x80000008;

// JumpTo Placeholders
var a1_jumpto=0x01010101;
var a2_jumpto=0x02020202;
var a3_jumpto=0x03030303;
var a4_jumpto=0x04040404;
var a5_jumpto=0x05050505;
var a6_jumpto=0x06060606;
var a7_jumpto=0x07070707;
var a8_jumpto=0x08080808;
var a9_jumpto=0x09090909;
var a10_jumpto=0x10101010;
var a11_jumpto=0x11111111;
var a12_jumpto=0x12121212;
var a13_jumpto=0x13131313;
var a14_jumpto=0x14141414;
var a15_jumpto=0x15151515;
var a16_jumpto=0x16161616;
var a17_jumpto=0x17171717;
var a18_jumpto=0x18181818;
var a19_jumpto=0x19191919;
var a20_jumpto=0x20202020;
var a21_jumpto=0x21212121;
var a22_jumpto=0x22222222;
var a23_jumpto=0x23232323;
var a24_jumpto=0x24242424;
var a25_jumpto=0x25252525;
var a26_jumpto=0x26262626;
var a27_jumpto=0x27272727;
var a28_jumpto=0x28282828;
var a29_jumpto=0x29292929;
var a30_jumpto=0x30303030;
var a31_jumpto=0x31313131;
var a32_jumpto=0x32323232;
var a33_jumpto=0x33333333;

// Find a better way for this later haha
var a1_r0=0x80140100;
var a1_r1=0x80140101;
var a1_r2=0x80140102;
var a1_r3=0x80140103;
var a1_r4=0x80140104;
var a1_r5=0x80140105;
var a1_r6=0x80140106;
var a1_r7=0x80140107;
var a1_r8=0x80140108;
var a1_r9=0x80140109;
var a1_r10=0x80140110;
var a1_r11=0x80140111;
var a1_r12=0x80140112;
var a1_r13=0x80140113;
var a1_r14=0x80140114;
var a1_r15=0x80140115;
var a1_r16=0x80140116;
var a1_r17=0x80140117;
var a1_r18=0x80140118;
var a1_r19=0x80140119;
var a1_r20=0x80140120;
var a1_r21=0x80140121;
var a1_r22=0x80140122;
var a1_r23=0x80140123;
var a1_r24=0x80140124;
var a1_r25=0x80140125;
var a1_r26=0x80140126;
var a1_r27=0x80140127;
var a1_r28=0x80140128;
var a1_r29=0x80140129;
var a1_r30=0x80140130;
var a1_r31=0x80140131;

var a2_r0=0x80140200;
var a2_r1=0x80140201;
var a2_r2=0x80140202;
var a2_r3=0x80140203;
var a2_r4=0x80140204;
var a2_r5=0x80140205;
var a2_r6=0x80140206;
var a2_r7=0x80140207;
var a2_r8=0x80140208;
var a2_r9=0x80140209;
var a2_r10=0x80140210;
var a2_r11=0x80140211;
var a2_r12=0x80140212;
var a2_r13=0x80140213;
var a2_r14=0x80140214;
var a2_r15=0x80140215;
var a2_r16=0x80140216;
var a2_r17=0x80140217;
var a2_r18=0x80140218;
var a2_r19=0x80140219;
var a2_r20=0x80140220;
var a2_r21=0x80140221;
var a2_r22=0x80140222;
var a2_r23=0x80140223;
var a2_r24=0x80140224;
var a2_r25=0x80140225;
var a2_r26=0x80140226;
var a2_r27=0x80140227;
var a2_r28=0x80140228;
var a2_r29=0x80140229;
var a2_r30=0x80140230;
var a2_r31=0x80140231;

var a3_r0=0x80140300;
var a3_r1=0x80140301;
var a3_r2=0x80140302;
var a3_r3=0x80140303;
var a3_r4=0x80140304;
var a3_r5=0x80140305;
var a3_r6=0x80140306;
var a3_r7=0x80140307;
var a3_r8=0x80140308;
var a3_r9=0x80140309;
var a3_r10=0x80140310;
var a3_r11=0x80140311;
var a3_r12=0x80140312;
var a3_r13=0x80140313;
var a3_r14=0x80140314;
var a3_r15=0x80140315;
var a3_r16=0x80140316;
var a3_r17=0x80140317;
var a3_r18=0x80140318;
var a3_r19=0x80140319;
var a3_r20=0x80140320;
var a3_r21=0x80140321;
var a3_r22=0x80140322;
var a3_r23=0x80140323;
var a3_r24=0x80140324;
var a3_r25=0x80140325;
var a3_r26=0x80140326;
var a3_r27=0x80140327;
var a3_r28=0x80140328;
var a3_r29=0x80140329;
var a3_r30=0x80140330;
var a3_r31=0x80140331;

var a4_r0=0x80140400;
var a4_r1=0x80140401;
var a4_r2=0x80140402;
var a4_r3=0x80140403;
var a4_r4=0x80140404;
var a4_r5=0x80140405;
var a4_r6=0x80140406;
var a4_r7=0x80140407;
var a4_r8=0x80140408;
var a4_r9=0x80140409;
var a4_r10=0x80140410;
var a4_r11=0x80140411;
var a4_r12=0x80140412;
var a4_r13=0x80140413;
var a4_r14=0x80140414;
var a4_r15=0x80140415;
var a4_r16=0x80140416;
var a4_r17=0x80140417;
var a4_r18=0x80140418;
var a4_r19=0x80140419;
var a4_r20=0x80140420;
var a4_r21=0x80140421;
var a4_r22=0x80140422;
var a4_r23=0x80140423;
var a4_r24=0x80140424;
var a4_r25=0x80140425;
var a4_r26=0x80140426;
var a4_r27=0x80140427;
var a4_r28=0x80140428;
var a4_r29=0x80140429;
var a4_r30=0x80140430;
var a4_r31=0x80140431;

var a5_r0=0x80140500;
var a5_r1=0x80140501;
var a5_r2=0x80140502;
var a5_r3=0x80140503;
var a5_r4=0x80140504;
var a5_r5=0x80140505;
var a5_r6=0x80140506;
var a5_r7=0x80140507;
var a5_r8=0x80140508;
var a5_r9=0x80140509;
var a5_r10=0x80140510;
var a5_r11=0x80140511;
var a5_r12=0x80140512;
var a5_r13=0x80140513;
var a5_r14=0x80140514;
var a5_r15=0x80140515;
var a5_r16=0x80140516;
var a5_r17=0x80140517;
var a5_r18=0x80140518;
var a5_r19=0x80140519;
var a5_r20=0x80140520;
var a5_r21=0x80140521;
var a5_r22=0x80140522;
var a5_r23=0x80140523;
var a5_r24=0x80140524;
var a5_r25=0x80140525;
var a5_r26=0x80140526;
var a5_r27=0x80140527;
var a5_r28=0x80140528;
var a5_r29=0x80140529;
var a5_r30=0x80140530;
var a5_r31=0x80140531;

var a6_r0=0x80140600;
var a6_r1=0x80140601;
var a6_r2=0x80140602;
var a6_r3=0x80140603;
var a6_r4=0x80140604;
var a6_r5=0x80140605;
var a6_r6=0x80140606;
var a6_r7=0x80140607;
var a6_r8=0x80140608;
var a6_r9=0x80140609;
var a6_r10=0x80140610;
var a6_r11=0x80140611;
var a6_r12=0x80140612;
var a6_r13=0x80140613;
var a6_r14=0x80140614;
var a6_r15=0x80140615;
var a6_r16=0x80140616;
var a6_r17=0x80140617;
var a6_r18=0x80140618;
var a6_r19=0x80140619;
var a6_r20=0x80140620;
var a6_r21=0x80140621;
var a6_r22=0x80140622;
var a6_r23=0x80140623;
var a6_r24=0x80140624;
var a6_r25=0x80140625;
var a6_r26=0x80140626;
var a6_r27=0x80140627;
var a6_r28=0x80140628;
var a6_r29=0x80140629;
var a6_r30=0x80140630;
var a6_r31=0x80140631;

var a7_r0=0x80140700;
var a7_r1=0x80140701;
var a7_r2=0x80140702;
var a7_r3=0x80140703;
var a7_r4=0x80140704;
var a7_r5=0x80140705;
var a7_r6=0x80140706;
var a7_r7=0x80140707;
var a7_r8=0x80140708;
var a7_r9=0x80140709;
var a7_r10=0x80140710;
var a7_r11=0x80140711;
var a7_r12=0x80140712;
var a7_r13=0x80140713;
var a7_r14=0x80140714;
var a7_r15=0x80140715;
var a7_r16=0x80140716;
var a7_r17=0x80140717;
var a7_r18=0x80140718;
var a7_r19=0x80140719;
var a7_r20=0x80140720;
var a7_r21=0x80140721;
var a7_r22=0x80140722;
var a7_r23=0x80140723;
var a7_r24=0x80140724;
var a7_r25=0x80140725;
var a7_r26=0x80140726;
var a7_r27=0x80140727;
var a7_r28=0x80140728;
var a7_r29=0x80140729;
var a7_r30=0x80140730;
var a7_r31=0x80140731;

var a8_r0=0x80140800;
var a8_r1=0x80140801;
var a8_r2=0x80140802;
var a8_r3=0x80140803;
var a8_r4=0x80140804;
var a8_r5=0x80140805;
var a8_r6=0x80140806;
var a8_r7=0x80140807;
var a8_r8=0x80140808;
var a8_r9=0x80140809;
var a8_r10=0x80140810;
var a8_r11=0x80140811;
var a8_r12=0x80140812;
var a8_r13=0x80140813;
var a8_r14=0x80140814;
var a8_r15=0x80140815;
var a8_r16=0x80140816;
var a8_r17=0x80140817;
var a8_r18=0x80140818;
var a8_r19=0x80140819;
var a8_r20=0x80140820;
var a8_r21=0x80140821;
var a8_r22=0x80140822;
var a8_r23=0x80140823;
var a8_r24=0x80140824;
var a8_r25=0x80140825;
var a8_r26=0x80140826;
var a8_r27=0x80140827;
var a8_r28=0x80140828;
var a8_r29=0x80140829;
var a8_r30=0x80140830;
var a8_r31=0x80140831;

var a9_r0=0x80140900;
var a9_r1=0x80140901;
var a9_r2=0x80140902;
var a9_r3=0x80140903;
var a9_r4=0x80140904;
var a9_r5=0x80140905;
var a9_r6=0x80140906;
var a9_r7=0x80140907;
var a9_r8=0x80140908;
var a9_r9=0x80140909;
var a9_r10=0x80140910;
var a9_r11=0x80140911;
var a9_r12=0x80140912;
var a9_r13=0x80140913;
var a9_r14=0x80140914;
var a9_r15=0x80140915;
var a9_r16=0x80140916;
var a9_r17=0x80140917;
var a9_r18=0x80140918;
var a9_r19=0x80140919;
var a9_r20=0x80140920;
var a9_r21=0x80140921;
var a9_r22=0x80140922;
var a9_r23=0x80140923;
var a9_r24=0x80140924;
var a9_r25=0x80140925;
var a9_r26=0x80140926;
var a9_r27=0x80140927;
var a9_r28=0x80140928;
var a9_r29=0x80140929;
var a9_r30=0x80140930;
var a9_r31=0x80140931;

var a10_r0=0x80141000;
var a10_r1=0x80141001;
var a10_r2=0x80141002;
var a10_r3=0x80141003;
var a10_r4=0x80141004;
var a10_r5=0x80141005;
var a10_r6=0x80141006;
var a10_r7=0x80141007;
var a10_r8=0x80141008;
var a10_r9=0x80141009;
var a10_r10=0x80141010;
var a10_r11=0x80141011;
var a10_r12=0x80141012;
var a10_r13=0x80141013;
var a10_r14=0x80141014;
var a10_r15=0x80141015;
var a10_r16=0x80141016;
var a10_r17=0x80141017;
var a10_r18=0x80141018;
var a10_r19=0x80141019;
var a10_r20=0x80141020;
var a10_r21=0x80141021;
var a10_r22=0x80141022;
var a10_r23=0x80141023;
var a10_r24=0x80141024;
var a10_r25=0x80141025;
var a10_r26=0x80141026;
var a10_r27=0x80141027;
var a10_r28=0x80141028;
var a10_r29=0x80141029;
var a10_r30=0x80141030;
var a10_r31=0x80141031;

var a11_r0=0x80141100;
var a11_r1=0x80141101;
var a11_r2=0x80141102;
var a11_r3=0x80141103;
var a11_r4=0x80141104;
var a11_r5=0x80141105;
var a11_r6=0x80141106;
var a11_r7=0x80141107;
var a11_r8=0x80141108;
var a11_r9=0x80141109;
var a11_r10=0x80141110;
var a11_r11=0x80141111;
var a11_r12=0x80141112;
var a11_r13=0x80141113;
var a11_r14=0x80141114;
var a11_r15=0x80141115;
var a11_r16=0x80141116;
var a11_r17=0x80141117;
var a11_r18=0x80141118;
var a11_r19=0x80141119;
var a11_r20=0x80141120;
var a11_r21=0x80141121;
var a11_r22=0x80141122;
var a11_r23=0x80141123;
var a11_r24=0x80141124;
var a11_r25=0x80141125;
var a11_r26=0x80141126;
var a11_r27=0x80141127;
var a11_r28=0x80141128;
var a11_r29=0x80141129;
var a11_r30=0x80141130;
var a11_r31=0x80141131;

var a12_r0=0x80141200;
var a12_r1=0x80141201;
var a12_r2=0x80141202;
var a12_r3=0x80141203;
var a12_r4=0x80141204;
var a12_r5=0x80141205;
var a12_r6=0x80141206;
var a12_r7=0x80141207;
var a12_r8=0x80141208;
var a12_r9=0x80141209;
var a12_r10=0x80141210;
var a12_r11=0x80141211;
var a12_r12=0x80141212;
var a12_r13=0x80141213;
var a12_r14=0x80141214;
var a12_r15=0x80141215;
var a12_r16=0x80141216;
var a12_r17=0x80141217;
var a12_r18=0x80141218;
var a12_r19=0x80141219;
var a12_r20=0x80141220;
var a12_r21=0x80141221;
var a12_r22=0x80141222;
var a12_r23=0x80141223;
var a12_r24=0x80141224;
var a12_r25=0x80141225;
var a12_r26=0x80141226;
var a12_r27=0x80141227;
var a12_r28=0x80141228;
var a12_r29=0x80141229;
var a12_r30=0x80141230;
var a12_r31=0x80141231;

var a13_r0=0x80141300;
var a13_r1=0x80141301;
var a13_r2=0x80141302;
var a13_r3=0x80141303;
var a13_r4=0x80141304;
var a13_r5=0x80141305;
var a13_r6=0x80141306;
var a13_r7=0x80141307;
var a13_r8=0x80141308;
var a13_r9=0x80141309;
var a13_r10=0x80141310;
var a13_r11=0x80141311;
var a13_r12=0x80141312;
var a13_r13=0x80141313;
var a13_r14=0x80141314;
var a13_r15=0x80141315;
var a13_r16=0x80141316;
var a13_r17=0x80141317;
var a13_r18=0x80141318;
var a13_r19=0x80141319;
var a13_r20=0x80141320;
var a13_r21=0x80141321;
var a13_r22=0x80141322;
var a13_r23=0x80141323;
var a13_r24=0x80141324;
var a13_r25=0x80141325;
var a13_r26=0x80141326;
var a13_r27=0x80141327;
var a13_r28=0x80141328;
var a13_r29=0x80141329;
var a13_r30=0x80141330;
var a13_r31=0x80141331;

var a14_r0=0x80141400;
var a14_r1=0x80141401;
var a14_r2=0x80141402;
var a14_r3=0x80141403;
var a14_r4=0x80141404;
var a14_r5=0x80141405;
var a14_r6=0x80141406;
var a14_r7=0x80141407;
var a14_r8=0x80141408;
var a14_r9=0x80141409;
var a14_r10=0x80141410;
var a14_r11=0x80141411;
var a14_r12=0x80141412;
var a14_r13=0x80141413;
var a14_r14=0x80141414;
var a14_r15=0x80141415;
var a14_r16=0x80141416;
var a14_r17=0x80141417;
var a14_r18=0x80141418;
var a14_r19=0x80141419;
var a14_r20=0x80141420;
var a14_r21=0x80141421;
var a14_r22=0x80141422;
var a14_r23=0x80141423;
var a14_r24=0x80141424;
var a14_r25=0x80141425;
var a14_r26=0x80141426;
var a14_r27=0x80141427;
var a14_r28=0x80141428;
var a14_r29=0x80141429;
var a14_r30=0x80141430;
var a14_r31=0x80141431;

var a15_r0=0x80141500;
var a15_r1=0x80141501;
var a15_r2=0x80141502;
var a15_r3=0x80141503;
var a15_r4=0x80141504;
var a15_r5=0x80141505;
var a15_r6=0x80141506;
var a15_r7=0x80141507;
var a15_r8=0x80141508;
var a15_r9=0x80141509;
var a15_r10=0x80141510;
var a15_r11=0x80141511;
var a15_r12=0x80141512;
var a15_r13=0x80141513;
var a15_r14=0x80141514;
var a15_r15=0x80141515;
var a15_r16=0x80141516;
var a15_r17=0x80141517;
var a15_r18=0x80141518;
var a15_r19=0x80141519;
var a15_r20=0x80141520;
var a15_r21=0x80141521;
var a15_r22=0x80141522;
var a15_r23=0x80141523;
var a15_r24=0x80141524;
var a15_r25=0x80141525;
var a15_r26=0x80141526;
var a15_r27=0x80141527;
var a15_r28=0x80141528;
var a15_r29=0x80141529;
var a15_r30=0x80141530;
var a15_r31=0x80141531;

var a16_r0=0x80141600;
var a16_r1=0x80141601;
var a16_r2=0x80141602;
var a16_r3=0x80141603;
var a16_r4=0x80141604;
var a16_r5=0x80141605;
var a16_r6=0x80141606;
var a16_r7=0x80141607;
var a16_r8=0x80141608;
var a16_r9=0x80141609;
var a16_r10=0x80141610;
var a16_r11=0x80141611;
var a16_r12=0x80141612;
var a16_r13=0x80141613;
var a16_r14=0x80141614;
var a16_r15=0x80141615;
var a16_r16=0x80141616;
var a16_r17=0x80141617;
var a16_r18=0x80141618;
var a16_r19=0x80141619;
var a16_r20=0x80141620;
var a16_r21=0x80141621;
var a16_r22=0x80141622;
var a16_r23=0x80141623;
var a16_r24=0x80141624;
var a16_r25=0x80141625;
var a16_r26=0x80141626;
var a16_r27=0x80141627;
var a16_r28=0x80141628;
var a16_r29=0x80141629;
var a16_r30=0x80141630;
var a16_r31=0x80141631;

var a17_r0=0x80141700;
var a17_r1=0x80141701;
var a17_r2=0x80141702;
var a17_r3=0x80141703;
var a17_r4=0x80141704;
var a17_r5=0x80141705;
var a17_r6=0x80141706;
var a17_r7=0x80141707;
var a17_r8=0x80141708;
var a17_r9=0x80141709;
var a17_r10=0x80141710;
var a17_r11=0x80141711;
var a17_r12=0x80141712;
var a17_r13=0x80141713;
var a17_r14=0x80141714;
var a17_r15=0x80141715;
var a17_r16=0x80141716;
var a17_r17=0x80141717;
var a17_r18=0x80141718;
var a17_r19=0x80141719;
var a17_r20=0x80141720;
var a17_r21=0x80141721;
var a17_r22=0x80141722;
var a17_r23=0x80141723;
var a17_r24=0x80141724;
var a17_r25=0x80141725;
var a17_r26=0x80141726;
var a17_r27=0x80141727;
var a17_r28=0x80141728;
var a17_r29=0x80141729;
var a17_r30=0x80141730;
var a17_r31=0x80141731;

var a18_r0=0x80141800;
var a18_r1=0x80141801;
var a18_r2=0x80141802;
var a18_r3=0x80141803;
var a18_r4=0x80141804;
var a18_r5=0x80141805;
var a18_r6=0x80141806;
var a18_r7=0x80141807;
var a18_r8=0x80141808;
var a18_r9=0x80141809;
var a18_r10=0x80141810;
var a18_r11=0x80141811;
var a18_r12=0x80141812;
var a18_r13=0x80141813;
var a18_r14=0x80141814;
var a18_r15=0x80141815;
var a18_r16=0x80141816;
var a18_r17=0x80141817;
var a18_r18=0x80141818;
var a18_r19=0x80141819;
var a18_r20=0x80141820;
var a18_r21=0x80141821;
var a18_r22=0x80141822;
var a18_r23=0x80141823;
var a18_r24=0x80141824;
var a18_r25=0x80141825;
var a18_r26=0x80141826;
var a18_r27=0x80141827;
var a18_r28=0x80141828;
var a18_r29=0x80141829;
var a18_r30=0x80141830;
var a18_r31=0x80141831;

var a19_r0=0x80141900;
var a19_r1=0x80141901;
var a19_r2=0x80141902;
var a19_r3=0x80141903;
var a19_r4=0x80141904;
var a19_r5=0x80141905;
var a19_r6=0x80141906;
var a19_r7=0x80141907;
var a19_r8=0x80141908;
var a19_r9=0x80141909;
var a19_r10=0x80141910;
var a19_r11=0x80141911;
var a19_r12=0x80141912;
var a19_r13=0x80141913;
var a19_r14=0x80141914;
var a19_r15=0x80141915;
var a19_r16=0x80141916;
var a19_r17=0x80141917;
var a19_r18=0x80141918;
var a19_r19=0x80141919;
var a19_r20=0x80141920;
var a19_r21=0x80141921;
var a19_r22=0x80141922;
var a19_r23=0x80141923;
var a19_r24=0x80141924;
var a19_r25=0x80141925;
var a19_r26=0x80141926;
var a19_r27=0x80141927;
var a19_r28=0x80141928;
var a19_r29=0x80141929;
var a19_r30=0x80141930;
var a19_r31=0x80141931;

var a20_r0=0x80142000;
var a20_r1=0x80142001;
var a20_r2=0x80142002;
var a20_r3=0x80142003;
var a20_r4=0x80142004;
var a20_r5=0x80142005;
var a20_r6=0x80142006;
var a20_r7=0x80142007;
var a20_r8=0x80142008;
var a20_r9=0x80142009;
var a20_r10=0x80142010;
var a20_r11=0x80142011;
var a20_r12=0x80142012;
var a20_r13=0x80142013;
var a20_r14=0x80142014;
var a20_r15=0x80142015;
var a20_r16=0x80142016;
var a20_r17=0x80142017;
var a20_r18=0x80142018;
var a20_r19=0x80142019;
var a20_r20=0x80142020;
var a20_r21=0x80142021;
var a20_r22=0x80142022;
var a20_r23=0x80142023;
var a20_r24=0x80142024;
var a20_r25=0x80142025;
var a20_r26=0x80142026;
var a20_r27=0x80142027;
var a20_r28=0x80142028;
var a20_r29=0x80142029;
var a20_r30=0x80142030;
var a20_r31=0x80142031;

var a21_r0=0x80142100;
var a21_r1=0x80142101;
var a21_r2=0x80142102;
var a21_r3=0x80142103;
var a21_r4=0x80142104;
var a21_r5=0x80142105;
var a21_r6=0x80142106;
var a21_r7=0x80142107;
var a21_r8=0x80142108;
var a21_r9=0x80142109;
var a21_r10=0x80142110;
var a21_r11=0x80142111;
var a21_r12=0x80142112;
var a21_r13=0x80142113;
var a21_r14=0x80142114;
var a21_r15=0x80142115;
var a21_r16=0x80142116;
var a21_r17=0x80142117;
var a21_r18=0x80142118;
var a21_r19=0x80142119;
var a21_r20=0x80142120;
var a21_r21=0x80142121;
var a21_r22=0x80142122;
var a21_r23=0x80142123;
var a21_r24=0x80142124;
var a21_r25=0x80142125;
var a21_r26=0x80142126;
var a21_r27=0x80142127;
var a21_r28=0x80142128;
var a21_r29=0x80142129;
var a21_r30=0x80142130;
var a21_r31=0x80142131;

var a22_r0=0x80142200;
var a22_r1=0x80142201;
var a22_r2=0x80142202;
var a22_r3=0x80142203;
var a22_r4=0x80142204;
var a22_r5=0x80142205;
var a22_r6=0x80142206;
var a22_r7=0x80142207;
var a22_r8=0x80142208;
var a22_r9=0x80142209;
var a22_r10=0x80142210;
var a22_r11=0x80142211;
var a22_r12=0x80142212;
var a22_r13=0x80142213;
var a22_r14=0x80142214;
var a22_r15=0x80142215;
var a22_r16=0x80142216;
var a22_r17=0x80142217;
var a22_r18=0x80142218;
var a22_r19=0x80142219;
var a22_r20=0x80142220;
var a22_r21=0x80142221;
var a22_r22=0x80142222;
var a22_r23=0x80142223;
var a22_r24=0x80142224;
var a22_r25=0x80142225;
var a22_r26=0x80142226;
var a22_r27=0x80142227;
var a22_r28=0x80142228;
var a22_r29=0x80142229;
var a22_r30=0x80142230;
var a22_r31=0x80142231;

var a23_r0=0x80142300;
var a23_r1=0x80142301;
var a23_r2=0x80142302;
var a23_r3=0x80142303;
var a23_r4=0x80142304;
var a23_r5=0x80142305;
var a23_r6=0x80142306;
var a23_r7=0x80142307;
var a23_r8=0x80142308;
var a23_r9=0x80142309;
var a23_r10=0x80142310;
var a23_r11=0x80142311;
var a23_r12=0x80142312;
var a23_r13=0x80142313;
var a23_r14=0x80142314;
var a23_r15=0x80142315;
var a23_r16=0x80142316;
var a23_r17=0x80142317;
var a23_r18=0x80142318;
var a23_r19=0x80142319;
var a23_r20=0x80142320;
var a23_r21=0x80142321;
var a23_r22=0x80142322;
var a23_r23=0x80142323;
var a23_r24=0x80142324;
var a23_r25=0x80142325;
var a23_r26=0x80142326;
var a23_r27=0x80142327;
var a23_r28=0x80142328;
var a23_r29=0x80142329;
var a23_r30=0x80142330;
var a23_r31=0x80142331;

var a24_r0=0x80142400;
var a24_r1=0x80142401;
var a24_r2=0x80142402;
var a24_r3=0x80142403;
var a24_r4=0x80142404;
var a24_r5=0x80142405;
var a24_r6=0x80142406;
var a24_r7=0x80142407;
var a24_r8=0x80142408;
var a24_r9=0x80142409;
var a24_r10=0x80142410;
var a24_r11=0x80142411;
var a24_r12=0x80142412;
var a24_r13=0x80142413;
var a24_r14=0x80142414;
var a24_r15=0x80142415;
var a24_r16=0x80142416;
var a24_r17=0x80142417;
var a24_r18=0x80142418;
var a24_r19=0x80142419;
var a24_r20=0x80142420;
var a24_r21=0x80142421;
var a24_r22=0x80142422;
var a24_r23=0x80142423;
var a24_r24=0x80142424;
var a24_r25=0x80142425;
var a24_r26=0x80142426;
var a24_r27=0x80142427;
var a24_r28=0x80142428;
var a24_r29=0x80142429;
var a24_r30=0x80142430;
var a24_r31=0x80142431;

var a25_r0=0x80142500;
var a25_r1=0x80142501;
var a25_r2=0x80142502;
var a25_r3=0x80142503;
var a25_r4=0x80142504;
var a25_r5=0x80142505;
var a25_r6=0x80142506;
var a25_r7=0x80142507;
var a25_r8=0x80142508;
var a25_r9=0x80142509;
var a25_r10=0x80142510;
var a25_r11=0x80142511;
var a25_r12=0x80142512;
var a25_r13=0x80142513;
var a25_r14=0x80142514;
var a25_r15=0x80142515;
var a25_r16=0x80142516;
var a25_r17=0x80142517;
var a25_r18=0x80142518;
var a25_r19=0x80142519;
var a25_r20=0x80142520;
var a25_r21=0x80142521;
var a25_r22=0x80142522;
var a25_r23=0x80142523;
var a25_r24=0x80142524;
var a25_r25=0x80142525;
var a25_r26=0x80142526;
var a25_r27=0x80142527;
var a25_r28=0x80142528;
var a25_r29=0x80142529;
var a25_r30=0x80142530;
var a25_r31=0x80142531;

var a26_r0=0x80142600;
var a26_r1=0x80142601;
var a26_r2=0x80142602;
var a26_r3=0x80142603;
var a26_r4=0x80142604;
var a26_r5=0x80142605;
var a26_r6=0x80142606;
var a26_r7=0x80142607;
var a26_r8=0x80142608;
var a26_r9=0x80142609;
var a26_r10=0x80142610;
var a26_r11=0x80142611;
var a26_r12=0x80142612;
var a26_r13=0x80142613;
var a26_r14=0x80142614;
var a26_r15=0x80142615;
var a26_r16=0x80142616;
var a26_r17=0x80142617;
var a26_r18=0x80142618;
var a26_r19=0x80142619;
var a26_r20=0x80142620;
var a26_r21=0x80142621;
var a26_r22=0x80142622;
var a26_r23=0x80142623;
var a26_r24=0x80142624;
var a26_r25=0x80142625;
var a26_r26=0x80142626;
var a26_r27=0x80142627;
var a26_r28=0x80142628;
var a26_r29=0x80142629;
var a26_r30=0x80142630;
var a26_r31=0x80142631;

var a27_r0=0x80142700;
var a27_r1=0x80142701;
var a27_r2=0x80142702;
var a27_r3=0x80142703;
var a27_r4=0x80142704;
var a27_r5=0x80142705;
var a27_r6=0x80142706;
var a27_r7=0x80142707;
var a27_r8=0x80142708;
var a27_r9=0x80142709;
var a27_r10=0x80142710;
var a27_r11=0x80142711;
var a27_r12=0x80142712;
var a27_r13=0x80142713;
var a27_r14=0x80142714;
var a27_r15=0x80142715;
var a27_r16=0x80142716;
var a27_r17=0x80142717;
var a27_r18=0x80142718;
var a27_r19=0x80142719;
var a27_r20=0x80142720;
var a27_r21=0x80142721;
var a27_r22=0x80142722;
var a27_r23=0x80142723;
var a27_r24=0x80142724;
var a27_r25=0x80142725;
var a27_r26=0x80142726;
var a27_r27=0x80142727;
var a27_r28=0x80142728;
var a27_r29=0x80142729;
var a27_r30=0x80142730;
var a27_r31=0x80142731;

var a28_r0=0x80142800;
var a28_r1=0x80142801;
var a28_r2=0x80142802;
var a28_r3=0x80142803;
var a28_r4=0x80142804;
var a28_r5=0x80142805;
var a28_r6=0x80142806;
var a28_r7=0x80142807;
var a28_r8=0x80142808;
var a28_r9=0x80142809;
var a28_r10=0x80142810;
var a28_r11=0x80142811;
var a28_r12=0x80142812;
var a28_r13=0x80142813;
var a28_r14=0x80142814;
var a28_r15=0x80142815;
var a28_r16=0x80142816;
var a28_r17=0x80142817;
var a28_r18=0x80142818;
var a28_r19=0x80142819;
var a28_r20=0x80142820;
var a28_r21=0x80142821;
var a28_r22=0x80142822;
var a28_r23=0x80142823;
var a28_r24=0x80142824;
var a28_r25=0x80142825;
var a28_r26=0x80142826;
var a28_r27=0x80142827;
var a28_r28=0x80142828;
var a28_r29=0x80142829;
var a28_r30=0x80142830;
var a28_r31=0x80142831;

var a29_r0=0x80142900;
var a29_r1=0x80142901;
var a29_r2=0x80142902;
var a29_r3=0x80142903;
var a29_r4=0x80142904;
var a29_r5=0x80142905;
var a29_r6=0x80142906;
var a29_r7=0x80142907;
var a29_r8=0x80142908;
var a29_r9=0x80142909;
var a29_r10=0x80142910;
var a29_r11=0x80142911;
var a29_r12=0x80142912;
var a29_r13=0x80142913;
var a29_r14=0x80142914;
var a29_r15=0x80142915;
var a29_r16=0x80142916;
var a29_r17=0x80142917;
var a29_r18=0x80142918;
var a29_r19=0x80142919;
var a29_r20=0x80142920;
var a29_r21=0x80142921;
var a29_r22=0x80142922;
var a29_r23=0x80142923;
var a29_r24=0x80142924;
var a29_r25=0x80142925;
var a29_r26=0x80142926;
var a29_r27=0x80142927;
var a29_r28=0x80142928;
var a29_r29=0x80142929;
var a29_r30=0x80142930;
var a29_r31=0x80142931;

var a30_r0=0x80143000;
var a30_r1=0x80143001;
var a30_r2=0x80143002;
var a30_r3=0x80143003;
var a30_r4=0x80143004;
var a30_r5=0x80143005;
var a30_r6=0x80143006;
var a30_r7=0x80143007;
var a30_r8=0x80143008;
var a30_r9=0x80143009;
var a30_r10=0x80143010;
var a30_r11=0x80143011;
var a30_r12=0x80143012;
var a30_r13=0x80143013;
var a30_r14=0x80143014;
var a30_r15=0x80143015;
var a30_r16=0x80143016;
var a30_r17=0x80143017;
var a30_r18=0x80143018;
var a30_r19=0x80143019;
var a30_r20=0x80143020;
var a30_r21=0x80143021;
var a30_r22=0x80143022;
var a30_r23=0x80143023;
var a30_r24=0x80143024;
var a30_r25=0x80143025;
var a30_r26=0x80143026;
var a30_r27=0x80143027;
var a30_r28=0x80143028;
var a30_r29=0x80143029;
var a30_r30=0x80143030;
var a30_r31=0x80143031;

var a31_r0=0x80143100;
var a31_r1=0x80143101;
var a31_r2=0x80143102;
var a31_r3=0x80143103;
var a31_r4=0x80143104;
var a31_r5=0x80143105;
var a31_r6=0x80143106;
var a31_r7=0x80143107;
var a31_r8=0x80143108;
var a31_r9=0x80143109;
var a31_r10=0x80143110;
var a31_r11=0x80143111;
var a31_r12=0x80143112;
var a31_r13=0x80143113;
var a31_r14=0x80143114;
var a31_r15=0x80143115;
var a31_r16=0x80143116;
var a31_r17=0x80143117;
var a31_r18=0x80143118;
var a31_r19=0x80143119;
var a31_r20=0x80143120;
var a31_r21=0x80143121;
var a31_r22=0x80143122;
var a31_r23=0x80143123;
var a31_r24=0x80143124;
var a31_r25=0x80143125;
var a31_r26=0x80143126;
var a31_r27=0x80143127;
var a31_r28=0x80143128;
var a31_r29=0x80143129;
var a31_r30=0x80143130;
var a31_r31=0x80143131;

var a32_r0=0x80143200;
var a32_r1=0x80143201;
var a32_r2=0x80143202;
var a32_r3=0x80143203;
var a32_r4=0x80143204;
var a32_r5=0x80143205;
var a32_r6=0x80143206;
var a32_r7=0x80143207;
var a32_r8=0x80143208;
var a32_r9=0x80143209;
var a32_r10=0x80143210;
var a32_r11=0x80143211;
var a32_r12=0x80143212;
var a32_r13=0x80143213;
var a32_r14=0x80143214;
var a32_r15=0x80143215;
var a32_r16=0x80143216;
var a32_r17=0x80143217;
var a32_r18=0x80143218;
var a32_r19=0x80143219;
var a32_r20=0x80143220;
var a32_r21=0x80143221;
var a32_r22=0x80143222;
var a32_r23=0x80143223;
var a32_r24=0x80143224;
var a32_r25=0x80143225;
var a32_r26=0x80143226;
var a32_r27=0x80143227;
var a32_r28=0x80143228;
var a32_r29=0x80143229;
var a32_r30=0x80143230;
var a32_r31=0x80143231;

var a33_r0=0x80143300;
var a33_r1=0x80143301;
var a33_r2=0x80143302;
var a33_r3=0x80143303;
var a33_r4=0x80143304;
var a33_r5=0x80143305;
var a33_r6=0x80143306;
var a33_r7=0x80143307;
var a33_r8=0x80143308;
var a33_r9=0x80143309;
var a33_r10=0x80143310;
var a33_r11=0x80143311;
var a33_r12=0x80143312;
var a33_r13=0x80143313;
var a33_r14=0x80143314;
var a33_r15=0x80143315;
var a33_r16=0x80143316;
var a33_r17=0x80143317;
var a33_r18=0x80143318;
var a33_r19=0x80143319;
var a33_r20=0x80143320;
var a33_r21=0x80143321;
var a33_r22=0x80143322;
var a33_r23=0x80143323;
var a33_r24=0x80143324;
var a33_r25=0x80143325;
var a33_r26=0x80143326;
var a33_r27=0x80143327;
var a33_r28=0x80143328;
var a33_r29=0x80143329;
var a33_r30=0x80143330;
var a33_r31=0x80143331;
